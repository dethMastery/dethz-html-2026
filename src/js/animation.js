let isSkip = false;

const removeSkipButton = () => {
  const btn = document.querySelector("#skip-btn");
  if (btn) {
    btn.remove();
  }
};

const unHide = (element, time) => {
  time = (time === undefined) | (time === null) ? 1 : time;

  if (isSkip) {
    return;
  }

  window.setTimeout(() => {
    if (!isSkip && element) {
      element.classList.remove("hidden");
    }
  }, 1000 * time);

  window.setTimeout(
    () => {
      if (!isSkip && element) {
        element.classList.remove("hide");
      }
    },
    1000 * time + 500,
  );
};

window.setTimeout(() => {
  if (isSkip) return;
  document.querySelector(".container")?.classList.remove("hidden");
  document.querySelector(".backdrop")?.classList.remove("hidden");
}, 1000);

window.setTimeout(() => {
  if (isSkip) return;
  document.querySelector(".container")?.classList.remove("hide");
  document.querySelector(".backdrop")?.classList.remove("hide");
  document.querySelector(".protect")?.classList.add("hidden");
}, 1500);

const skip = () => {
  isSkip = true;

  document.querySelectorAll(".hidden").forEach((el) => {
    if (!el.classList.contains("protect")) {
      el.classList.remove("hidden");
    }
  });

  document.querySelectorAll(".hide").forEach((el) => {
    el.classList.remove("hide");
  });

  document.querySelector(".protect")?.classList.add("hidden");

  removeSkipButton();
};

const skipBtn = document.querySelector("#skip-btn");
if (skipBtn) {
  skipBtn.addEventListener("click", skip);
}

// Remove skip button after all animations complete (4.5s)
window.setTimeout(() => {
  removeSkipButton();
}, 4500);
