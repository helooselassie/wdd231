const yearEl = document.querySelector("#currentyear");
const modifiedEl = document.querySelector("#lastModified");

yearEl.textContent = new Date().getFullYear();
modifiedEl.textContent = document.lastModified;
