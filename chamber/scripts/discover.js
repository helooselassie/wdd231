import { places } from "../data/discover.mjs";

const placesContainer = document.querySelector("#places");
const visitMessage = document.querySelector("#visit-message");
const dayInMs = 1000 * 60 * 60 * 24;

function showPlaces() {
  places.forEach((place) => {
    const card = document.createElement("article");
    card.className = "place";

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="images/${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn more</button>
    `;

    // Opens the place on a map, so the button always has something useful to do
    card.querySelector("button").addEventListener("click", () => {
      const search = encodeURIComponent(`${place.name}, Accra, Ghana`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${search}`, "_blank", "noopener");
    });

    placesContainer.append(card);
  });
}

function showVisitMessage() {
  const now = Date.now();
  let lastVisit = null;

  try {
    lastVisit = Number(localStorage.getItem("lastVisit")) || null;
    localStorage.setItem("lastVisit", now);
  } catch (error) {
    console.error(error);
  }

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else if (now - lastVisit < dayInMs) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else {
    const days = Math.floor((now - lastVisit) / dayInMs);
    visitMessage.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
  }
}

showPlaces();
showVisitMessage();
