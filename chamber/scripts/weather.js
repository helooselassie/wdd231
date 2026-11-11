const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const forecastList = document.querySelector('#forecast');

// Accra, Ghana
const lat = 5.56;
const lon = -0.2;
const apiKey = 'YOUR_API_KEY'; // paste your own OpenWeatherMap key here
const base = 'https://api.openweathermap.org/data/2.5';
const query = `lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getJson(endpoint) {
  const response = await fetch(`${base}/${endpoint}?${query}`);
  if (!response.ok) throw Error(await response.text());
  return response.json();
}

function showCurrent(data) {
  const { description, icon } = data.weather[0];
  currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDesc.textContent = description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.alt = description;
}

function showForecast(data) {
  const today = new Date().toISOString().slice(0, 10);
  const days = data.list
    .filter(item => item.dt_txt.includes('12:00:00') && !item.dt_txt.startsWith(today))
    .slice(0, 3);

  forecastList.innerHTML = '';
  days.forEach(item => {
    const li = document.createElement('li');
    const day = document.createElement('span');
    day.className = 'day';
    day.textContent = new Date(item.dt * 1000).toLocaleDateString('en-GB', { weekday: 'short' });
    const temp = document.createElement('span');
    temp.className = 't';
    temp.textContent = `${Math.round(item.main.temp)}°C`;
    li.append(day, temp);
    forecastList.appendChild(li);
  });
}

async function loadWeather() {
  try {
    const [current, forecast] = await Promise.all([getJson('weather'), getJson('forecast')]);
    showCurrent(current);
    showForecast(forecast);
  } catch (error) {
    weatherDesc.textContent = 'Weather is unavailable right now.';
    console.error(error);
  }
}

loadWeather();
