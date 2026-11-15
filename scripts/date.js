// date.js
// Fills in the two dynamic footer lines: the copyright year
// and the date this file was last modified.

const currentYear = new Date().getFullYear();
const name = "Selassie Kwabla Heloo";
const state = "Ghana";

document.getElementById("copyright").innerHTML =
  `&copy; ${currentYear} ${name}, ${state}`;

// document.lastModified is a built-in property the browser fills
// in automatically from the file itself, no manipulation needed.
document.getElementById("lastModified").innerHTML =
  `Last Modified: ${document.lastModified}`;
