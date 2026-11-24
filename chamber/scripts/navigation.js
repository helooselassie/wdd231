const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
});
