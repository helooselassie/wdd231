const menuButton = document.querySelector("#menu-button");
const navList = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});
