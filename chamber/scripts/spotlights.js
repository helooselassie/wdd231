const spotlightBox = document.querySelector('#spotlights');
const LEVELS = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

function levelNumber(m) {
  const value = m.membershipLevel ?? m.level ?? m.membership;
  if (typeof value === 'string') {
    const text = value.toLowerCase();
    if (text === 'gold') return 3;
    if (text === 'silver') return 2;
  }
  return Number(value) || 1;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function addLine(parent, text) {
  if (!text) return null;
  const p = document.createElement('p');
  p.textContent = text;
  parent.appendChild(p);
  return p;
}

function createSpotlight(m) {
  const name = m.name || m.companyName || 'Business';
  const url = m.website || m.url || m.websiteUrl;
  const level = levelNumber(m);
  let image = m.image || m.imageFileName || m.imageFile || '';
  if (image && !image.includes('/')) image = `images/${image}`;

  const card = document.createElement('article');
  card.className = 'spotlight';

  const h3 = document.createElement('h3');
  h3.textContent = name;
  card.appendChild(h3);

  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = `${name} logo`;
    img.width = 88;
    img.height = 88;
    img.loading = 'lazy';
    card.appendChild(img);
  }

  addLine(card, m.phone || m.phoneNumber);
  addLine(card, m.address || m.addresses);

  if (url) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = url.startsWith('http') ? url : `https://${url}`;
    a.textContent = url.replace(/^https?:\/\//, '');
    p.appendChild(a);
    card.appendChild(p);
  }

  const badge = document.createElement('span');
  badge.className = `level level-${level}`;
  badge.textContent = LEVELS[level];
  card.appendChild(badge);

  return card;
}

async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    const members = Array.isArray(data) ? data : data.members || data.companies || [];
    const eligible = members.filter(m => levelNumber(m) >= 2);
    const picks = shuffle(eligible).slice(0, 3);

    spotlightBox.innerHTML = '';
    picks.forEach(m => spotlightBox.appendChild(createSpotlight(m)));
  } catch (error) {
    spotlightBox.textContent = 'Spotlights are unavailable right now.';
    console.error(error);
  }
}

loadSpotlights();
