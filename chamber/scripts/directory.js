const directory = document.querySelector('#directory');
const gridBtn = document.querySelector('#gridViewBtn');
const listBtn = document.querySelector('#listViewBtn');
const LEVELS = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

function addDetail(parent, icon, content) {
  if (!content) return;
  const p = document.createElement('p');
  const i = document.createElement('span');
  i.className = 'icon';
  i.setAttribute('aria-hidden', 'true');
  i.textContent = icon;
  const text = document.createElement('span');
  if (typeof content === 'string') text.textContent = content;
  else text.appendChild(content);
  p.append(i, text);
  parent.appendChild(p);
}

function createCard(m) {
  const name = m.name || m.companyName || 'Business';
  const address = m.address || m.addresses;
  const phone = m.phone || m.phoneNumber;
  const url = m.website || m.url || m.websiteUrl;
  const tagline = m.tagline || m.otherInfo;
  const level = Number(m.membershipLevel || m.level || m.membership || 1);
  let image = m.image || m.imageFileName || m.imageFile || '';
  if (image && !image.includes('/')) image = `images/${image}`;

  const card = document.createElement('article');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card-header';
  const h2 = document.createElement('h2');
  h2.textContent = name;
  header.appendChild(h2);
  if (tagline) {
    const tag = document.createElement('p');
    tag.textContent = tagline;
    header.appendChild(tag);
  }

  const body = document.createElement('div');
  body.className = 'card-body';
  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = `${name} logo`;
    img.width = 96;
    img.height = 96;
    img.loading = 'lazy';
    body.appendChild(img);
  }

  const details = document.createElement('div');
  details.className = 'card-details';
  addDetail(details, '📍', address);
  addDetail(details, '📞', phone);
  addDetail(details, '✉️', m.email);
  if (url) {
    const a = document.createElement('a');
    a.href = url.startsWith('http') ? url : `https://${url}`;
    a.textContent = url.replace(/^https?:\/\//, '');
    addDetail(details, '🌐', a);
  }
  body.appendChild(details);

  const footer = document.createElement('div');
  footer.className = 'card-footer';
  const badge = document.createElement('span');
  badge.className = `level level-${level}`;
  badge.textContent = LEVELS[level] || 'Member';
  footer.appendChild(badge);
  if (m.founded) {
    const since = document.createElement('span');
    since.className = 'since';
    since.textContent = `Since ${m.founded}`;
    footer.appendChild(since);
  }

  card.append(header, body, footer);
  return card;
}

function displayMembers(members) {
  directory.innerHTML = '';
  members.forEach(m => directory.appendChild(createCard(m)));
}

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    const members = Array.isArray(data) ? data : data.members || data.companies || [];
    displayMembers(members);
  } catch (error) {
    directory.textContent = 'Sorry, the directory could not be loaded right now.';
    console.error(error);
  }
}

function setView(view) {
  directory.classList.toggle('list-view', view === 'list');
  gridBtn.setAttribute('aria-pressed', view === 'grid');
  listBtn.setAttribute('aria-pressed', view === 'list');
}

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

getMembers();