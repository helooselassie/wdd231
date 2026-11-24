// Free OpenWeatherMap key from openweathermap.org. New keys can take a couple
// of hours to start working. A key in front-end code is visible to visitors.
const apiKey = "283abbfd02f9ca489f2b9b508835b9ca";
const query = `lat=5.6037&lon=-0.1870&units=metric&appid=${apiKey}`;
const baseUrl = "https://api.openweathermap.org/data/2.5";

const currentBox = document.querySelector("#current-weather");
const forecastList = document.querySelector("#forecast");

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function getJson(path) {
  const response = await fetch(`${baseUrl}/${path}?${query}`);
  if (!response.ok) {
    throw new Error(`Weather request failed with status ${response.status}`);
  }
  return response.json();
}

function showCurrent(data) {
  const temperature = Math.round(data.main.temp);
  const description = capitalize(data.weather[0].description);
  currentBox.textContent = `${temperature}\u00b0C, ${description}`;
}

// The forecast comes in 3-hour steps, so keep the entry closest to midday for each of the next three days
function pickDailyForecast(list) {
  const today = new Date().toISOString().slice(0, 10);
  const days = new Map();

  list.forEach((entry) => {
    const date = entry.dt_txt.slice(0, 10);
    if (date === today) return;
    const gap = Math.abs(Number(entry.dt_txt.slice(11, 13)) - 12);
    if (!days.has(date) || gap < days.get(date).gap) {
      days.set(date, { entry, gap });
    }
  });

  return [...days.values()].slice(0, 3).map((day) => day.entry);
}

function showForecast(entries) {
  entries.forEach((entry) => {
    const dayName = new Date(entry.dt * 1000).toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" });
    const item = document.createElement("li");
    item.textContent = `${dayName}: ${Math.round(entry.main.temp)}\u00b0C`;
    forecastList.append(item);
  });
}

async function showWeather() {
  try {
    const [current, forecast] = await Promise.all([getJson("weather"), getJson("forecast")]);
    showCurrent(current);
    showForecast(pickDailyForecast(forecast.list));
  } catch (error) {
    console.error(error);
    currentBox.textContent = "Weather isn't available right now.";
  }
}

showWeather();
