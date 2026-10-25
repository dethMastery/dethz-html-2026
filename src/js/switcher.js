const STORAGE_KEY = "theme";
const THEME_DARK = "macchiato";
const THEME_LIGHT = "latte";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? THEME_LIGHT
    : THEME_DARK;
}

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function getCurrentTheme() {
  return (
    document.documentElement.getAttribute("data-theme") ||
    getStoredTheme() ||
    getSystemTheme()
  );
}

function updateToggleButton(theme) {
  const buttons = document.querySelectorAll(
    "#theme-toggle, [data-theme-toggle]",
  );
  buttons.forEach((btn) => {
    const isLight = theme === THEME_LIGHT;
    btn.setAttribute(
      "aria-label",
      `Switch to ${isLight ? "dark" : "light"} theme`,
    );
    btn.setAttribute("title", `Switch to ${isLight ? "dark" : "light"} theme`);
    btn.setAttribute("data-active-theme", theme);

    const sunIcon = btn.querySelector(".icon-sun");
    const moonIcon = btn.querySelector(".icon-moon");
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isLight ? "none" : "inline-block";
      moonIcon.style.display = isLight ? "inline-block" : "none";
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateToggleButton(theme);
}

function setTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

function toggleTheme() {
  const next = getCurrentTheme() === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
  setTheme(next);
  return next;
}

// Apply immediately on load to prevent theme flash
applyTheme(getStoredTheme() || getSystemTheme());

// Follow OS preference if user has not set explicit preference
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", (e) => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? THEME_LIGHT : THEME_DARK);
    }
  });

function initSwitcher() {
  updateToggleButton(getCurrentTheme());
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#theme-toggle, [data-theme-toggle]");
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSwitcher);
} else {
  initSwitcher();
}

window.ThemeSwitcher = {
  getTheme: getCurrentTheme,
  setTheme,
  toggleTheme,
  THEME_DARK,
  THEME_LIGHT,
};
