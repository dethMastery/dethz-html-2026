(() => {
  function hasBgParam() {
    const params = new URLSearchParams(window.location.search);
    return params.has("bg") || params.has("background");
  }

  function updateButton(isBg) {
    const btn = document.querySelector("#bg-toggle");
    if (!btn) return;
    const label = isBg ? "Show content" : "Hide content to watch background";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);

    const eyeIcon = btn.querySelector(".icon-eye");
    const eyeOffIcon = btn.querySelector(".icon-eye-off");
    if (eyeIcon && eyeOffIcon) {
      eyeIcon.style.display = isBg ? "none" : "block";
      eyeOffIcon.style.display = isBg ? "block" : "none";
    }
  }

  function setBgMode(enable, updateUrl = true) {
    if (enable) {
      document.body.classList.add("bg-mode");
      document.documentElement.classList.add("bg-mode");
      if (typeof skip === "function") {
        skip();
      }
    } else {
      document.body.classList.remove("bg-mode");
      document.documentElement.classList.remove("bg-mode");
    }

    updateButton(enable);

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (enable) {
        url.searchParams.set("bg", "true");
      } else {
        url.searchParams.delete("bg");
        url.searchParams.delete("background");
      }
      const query = url.searchParams.toString();
      const newUrl = url.pathname + (query ? `?${query}` : "") + url.hash;
      window.history.replaceState({}, "", newUrl);
    }
  }

  function toggleBgMode() {
    const isCurrentlyBg = document.body.classList.contains("bg-mode");
    setBgMode(!isCurrentlyBg, true);
  }

  function initBgMode() {
    const isBg = hasBgParam();
    if (isBg) {
      setBgMode(true, false);
    } else {
      updateButton(false);
    }

    const btn = document.querySelector("#bg-toggle");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleBgMode();
      });
    }
  }

  // Pre-apply class immediately if search param is present
  if (hasBgParam()) {
    if (document.body) {
      document.body.classList.add("bg-mode");
    }
    document.documentElement.classList.add("bg-mode");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBgMode);
  } else {
    initBgMode();
  }

  window.BgMode = {
    toggle: toggleBgMode,
    set: setBgMode,
  };
})();

