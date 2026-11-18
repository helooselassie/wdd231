// ----- Weather: current conditions + short forecast for Tema, Ghana -----
// OpenWeatherMap key for this course project. Client-side exposure is expected
// for a WDD231 assignment; this key should not be reused for a production app.
const WEATHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
const TEMA_LAT = 5.6698;
const TEMA_LON = -0.0166;

async function getWeather() {
  const widget = document.querySelector("#weatherWidget");
  if (!widget) return;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${TEMA_LAT}&lon=${TEMA_LON}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather request failed (${response.status})`);
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    widget.innerHTML = `<p class="loading">Weather is unavailable right now.</p>`;
    console.error("Error fetching weather:", error);
  }
}

function displayWeather(data) {
  const widget = document.querySelector("#weatherWidget");
  const current = data.list[0];
  const temp = Math.round(current.main.temp);
  const feelsLike = Math.round(current.main.feels_like);
  const description = current.weather[0].description;
  const iconCode = current.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // The forecast endpoint returns one entry every 3 hours; picking entries
  // roughly 24 hours apart gives a simple 3-day outlook.
  const forecastSteps = [data.list[8], data.list[16], data.list[24]].filter(Boolean);

  const forecastHtml = forecastSteps
    .map((step) => {
      const date = new Date(step.dt * 1000);
      const day = date.toLocaleDateString(undefined, { weekday: "short" });
      const stepTemp = Math.round(step.main.temp);
      return `
        <div class="forecast-day">
          <p class="forecast-label">${day}</p>
          <p class="forecast-temp">${stepTemp}&deg;C</p>
        </div>
      `;
    })
    .join("");

  widget.innerHTML = `
    <div class="weather-now">
      <img src="${iconUrl}" alt="${description}" width="60" height="60" />
      <div>
        <p class="weather-temp">${temp}&deg;C</p>
        <p class="weather-desc">${description}</p>
        <p class="weather-feels">Feels like ${feelsLike}&deg;C</p>
      </div>
    </div>
    <div class="weather-forecast">
      ${forecastHtml}
    </div>
  `;
}

getWeather();

// ----- Member spotlights: 3 random members pulled from members.json -----
const levelNames = {
  1: "Member",
  2: "Silver Member",
  3: "Gold Member",
};

async function getSpotlights() {
  const container = document.querySelector("#spotlightContainer");
  if (!container) return;

  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();
    displaySpotlights(data.members);
  } catch (error) {
    container.innerHTML = `<p class="loading">Member spotlights are unavailable right now.</p>`;
    console.error("Error fetching member data:", error);
  }
}

function pickRandomMembers(members, count) {
  const pool = [...members];
  const picked = [];
  while (picked.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

function displaySpotlights(members) {
  const container = document.querySelector("#spotlightContainer");
  container.innerHTML = "";

  const spotlighted = pickRandomMembers(members, 3);

  spotlighted.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="64" height="64" />
      <h3>${member.name}</h3>
      <p class="spotlight-category">${member.category}</p>
      <p class="spotlight-phone">${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      <span class="badge level-${member.membershipLevel}">${levelNames[member.membershipLevel]}</span>
    `;

    container.appendChild(card);
  });
}

getSpotlights();
