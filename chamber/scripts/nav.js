// Shared header/footer behavior used on every page of the site.

const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector("#primaryNav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}

const yearSpan = document.querySelector("#currentYear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.querySelector("#lastModified");
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}
