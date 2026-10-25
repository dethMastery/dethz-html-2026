// ASCII Video Art Renderer - Full Screen Cover
(function () {
  const RAMP_DARK = ' .\':-=+*#%@';
  const RAMP_LIGHT = '@%#*+=-:\'. ';

  let video = null;
  let pre = null;
  let container = null;
  let canvas = null;
  let ctx = null;

  let cols = 160;
  let rows = 60;
  let lines = [];
  let animId = null;
  let isRunning = false;

  function isLightMode() {
    return (
      document.documentElement.getAttribute('data-theme') === 'latte' ||
      (!document.documentElement.getAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: light)').matches)
    );
  }

  function getRamp() {
    return isLightMode() ? RAMP_LIGHT : RAMP_DARK;
  }

  function measureCharAspect() {
    const span = document.createElement('span');
    span.style.fontFamily = "'Fira Code', monospace";
    span.style.fontSize = '20px';
    span.style.lineHeight = '0.65';
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'pre';
    span.textContent = 'M';
    document.body.appendChild(span);
    const rect = span.getBoundingClientRect();
    span.remove();
    return rect.width > 0 && rect.height > 0 ? rect.width / rect.height : 0.925;
  }

  function calculateDimensions() {
    if (!container || !pre) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    const charAspect = measureCharAspect();
    const containerAspect = width / height;

    // Density: smooth detail on all resolutions
    // ~160-200 columns on desktop, ~70-100 on mobile
    const targetCols = Math.round(
      Math.min(220, Math.max(70, width / (width < 768 ? 6 : 9)))
    );
    const targetRows = Math.round(targetCols * (charAspect / containerAspect));

    // Calculate font-size to fill container exactly
    // In Fira Code, character width is ~0.6 * fontSize
    const charWidth = width / targetCols;
    const optimalFontSize = charWidth / 0.6;

    pre.style.fontSize = `${optimalFontSize.toFixed(3)}px`;
    pre.style.lineHeight = '0.65';

    cols = targetCols;
    rows = targetRows;
    lines = new Array(rows);

    if (canvas) {
      canvas.width = cols;
      canvas.height = rows;
    }
  }

  function renderFrame() {
    if (!isRunning) return;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      const vw = video.videoWidth || 960;
      const vh = video.videoHeight || 720;
      const videoAspect = vw / vh;
      const containerAspect = (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight);

      // Center-crop video source like object-fit: cover
      let sx = 0;
      let sy = 0;
      let sw = vw;
      let sh = vh;

      if (containerAspect > videoAspect) {
        // Container wider than video: crop top/bottom
        sh = vw / containerAspect;
        sy = (vh - sh) / 2;
      } else {
        // Container taller than video: crop left/right
        sw = vh * containerAspect;
        sx = (vw - sw) / 2;
      }

      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cols, rows);
      const imgData = ctx.getImageData(0, 0, cols, rows).data;
      const ramp = getRamp();
      const rampLen = ramp.length;
      const rampMax = rampLen - 1;

      for (let y = 0; y < rows; y++) {
        const rowOffset = y * cols * 4;
        let line = '';
        for (let x = 0; x < cols; x++) {
          const idx = rowOffset + (x << 2);
          const lum =
            (imgData[idx] * 77 + imgData[idx + 1] * 150 + imgData[idx + 2] * 29) >>
            8;
          const charIdx = (lum * rampLen) >> 8;
          line += ramp[charIdx > rampMax ? rampMax : charIdx];
        }
        lines[y] = line;
      }

      pre.textContent = lines.join('\n');
    }

    animId = requestAnimationFrame(renderFrame);
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    animId = requestAnimationFrame(renderFrame);
  }

  function stop() {
    isRunning = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  function init() {
    container = document.querySelector('.main-container') || document.body;
    video = container.querySelector('video') || document.querySelector('video');

    if (!video) {
      video = document.createElement('video');
      video.src = '/src/video/output.webm';
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      container.appendChild(video);
    } else {
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
    }

    pre = container.querySelector('.ascii-art');
    if (!pre) {
      pre = document.createElement('pre');
      pre.className = 'ascii-art';
      pre.setAttribute('aria-hidden', 'true');
      container.appendChild(pre);
    }

    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d', { willReadFrequently: true });

    calculateDimensions();

    video.play().catch(() => {
      const onFirstClick = () => {
        video.play();
        window.removeEventListener('click', onFirstClick);
        window.removeEventListener('keydown', onFirstClick);
      };
      window.addEventListener('click', onFirstClick);
      window.addEventListener('keydown', onFirstClick);
    });

    video.addEventListener('loadedmetadata', calculateDimensions);
    window.addEventListener('resize', calculateDimensions);

    // Watch for theme toggles to update ramp immediately
    const themeObserver = new MutationObserver(() => {
      // Auto-updates next animation frame
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
