const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#site-nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  const open = nav.classList.contains("open");
  menuButton.setAttribute("aria-expanded", open);
  menuButton.innerHTML = open ? "&times;" : "&#9776;";
});
