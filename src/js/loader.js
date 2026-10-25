window.setTimeout(() => {
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector(".backdrop").classList.remove("hidden");
}, 1000);

window.setTimeout(() => {
  document.querySelector(".container").classList.remove("hide");
  document.querySelector(".backdrop").classList.remove("hide");
  document.querySelector(".protect").classList.add("hidden");
}, 1500);

userLoad();
