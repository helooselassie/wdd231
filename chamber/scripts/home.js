/* Get a free key at https://openweathermap.org/api (new keys can take a couple of hours to activate) */
const apiKey = '283abbfd02f9ca489f2b9b508835b9ca';
const latitude = 5.6037;
const longitude = -0.187;
const weatherBase = 'https://api.openweathermap.org/data/2.5';

const currentBox = document.querySelector('#current-weather');
const forecastList = document.querySelector('#forecast');
const spotlightBox = document.querySelector('#spotlights');

const levelNames = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

/* ---------- Weather ---------- */

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Shift the timestamp by the city's UTC offset so "today" matches Accra's calendar day
function localDate(seconds, offset) {
  return new Date((seconds + offset) * 1000).toISOString().slice(0, 10);
}

function dayName(dateString) {
  return new Date(`${dateString}T00:00:00Z`)
    .toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'UTC' });
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

function showCurrent(current) {
  const temp = Math.round(current.main.temp);
  const description = capitalize(current.weather[0].description);
  currentBox.replaceChildren(
    makeElement('p', `${temp}°C`, 'temperature'),
    makeElement('p', description),
    makeElement('p', `Humidity: ${current.main.humidity}%`)
  );
}

function showForecast(forecast, today) {
  const days = new Map();

  for (const entry of forecast.list) {
    const date = localDate(entry.dt, forecast.city.timezone);
    if (date <= today) continue;
    const day = days.get(date) || { high: -Infinity, low: Infinity };
    day.high = Math.max(day.high, entry.main.temp_max);
    day.low = Math.min(day.low, entry.main.temp_min);
    days.set(date, day);
  }

  const items = [...days].slice(0, 3).map(([date, day]) => {
    const item = makeElement('li');
    item.append(
      makeElement('span', dayName(date), 'day'),
      makeElement('span', `High ${Math.round(day.high)}°C / Low ${Math.round(day.low)}°C`)
    );
    return item;
  });
  forecastList.replaceChildren(...items);
}

async function getWeather() {
  try {
    if (apiKey === '283abbfd02f9ca489f2b9b508835b9ca') {
      throw new Error('Add your OpenWeatherMap API key to scripts/home.js');
    }
    const query = `lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const [current, forecast] = await Promise.all([
      fetchJson(`${weatherBase}/weather?${query}`),
      fetchJson(`${weatherBase}/forecast?${query}`)
    ]);
    const today = localDate(current.dt, current.timezone);
    showCurrent(current);
    showForecast(forecast, today);
  } catch (error) {
    console.error('Weather unavailable:', error);
    currentBox.textContent = 'Weather is unavailable right now.';
    forecastList.replaceChildren();
  }
}

/* ---------- Spotlights ---------- */

// Fisher-Yates shuffle on a copy, so the original data is untouched
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildSpotlight(member) {
  const card = makeElement('article', '', 'member');
  const levelName = levelNames[member.level];

  const image = document.createElement('img');
  image.src = `images/${member.image}`;
  image.alt = `${member.name} logo`;
  image.width = 200;
  image.height = 120;
  image.loading = 'lazy';

  const phoneLink = makeElement('a', member.phone);
  phoneLink.href = `tel:${member.phone.replace(/\s/g, '')}`;
  const phone = makeElement('p');
  phone.appendChild(phoneLink);

  const websiteLink = makeElement('a', 'Visit website');
  websiteLink.href = member.website;
  websiteLink.target = '_blank';
  websiteLink.rel = 'noopener noreferrer';
  const website = makeElement('p');
  website.appendChild(websiteLink);

  const body = makeElement('div', '', 'member-body');
  body.append(
    makeElement('h3', member.name),
    makeElement('span', `${levelName} level`, `badge ${levelName.toLowerCase()}`),
    makeElement('p', member.address),
    phone,
    website
  );

  card.append(image, body);
  return card;
}

async function getSpotlights() {
  try {
    const data = await fetchJson('data/members.json');
    const eligible = data.members.filter((member) => member.level === 2 || member.level === 3);
    const count = Math.min(eligible.length, Math.random() < 0.5 ? 2 : 3);
    spotlightBox.replaceChildren(...shuffle(eligible).slice(0, count).map(buildSpotlight));
  } catch (error) {
    console.error('Could not load spotlights:', error);
    spotlightBox.textContent = 'Member spotlights are unavailable right now.';
  }
}

getWeather();
getSpotlights();