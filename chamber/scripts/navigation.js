const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

const themeToggle = document.querySelector("#theme");
const root = document.documentElement;
const storedTheme = localStorage.getItem("gcc-theme");

if (storedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
}

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("gcc-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("gcc-theme", "dark");
  }
});
