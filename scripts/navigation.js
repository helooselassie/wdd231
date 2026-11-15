// navigation.js
// Handles the small-screen hamburger menu: clicking the button
// toggles the nav open and closed, and updates aria-expanded
// so screen readers announce the state correctly (accessibility).

const menuButton = document.getElementById("menu-button");
const primaryNav = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
  primaryNav.classList.toggle("open");

  const isOpen = primaryNav.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});
