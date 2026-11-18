const membersUrl = 'data/members.json';
const container = document.querySelector('#members');
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

const levelNames = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
let members = [];
let currentView = 'grid';

/* Fetch the member data from the JSON file */
async function getMembers() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    members = data.members;
    displayMembers();
  } catch (error) {
    console.error('Could not load members:', error);
    container.innerHTML = '<p class="status">Sorry, the member list could not be loaded. Please try again later.</p>';
  }
}

function buildCard(member) {
  const card = makeElement('article', '', 'member');
  const levelName = levelNames[member.level] || 'Member';

  // Images only appear in grid view; list view is text only
  if (currentView === 'grid') {
    const image = document.createElement('img');
    image.src = `images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.width = 200;
    image.height = 120;
    image.loading = 'lazy';
    card.appendChild(image);
  }

  const body = makeElement('div', '', 'member-body');
  const badge = makeElement('span', `${levelName} level`, `badge ${levelName.toLowerCase()}`);

  const contact = makeElement('div', '', 'contact');
  const address = makeElement('p', member.address);
  const phone = makeElement('p');
  const phoneLink = makeElement('a', member.phone);
  phoneLink.href = `tel:${member.phone.replace(/\s/g, '')}`;
  phone.appendChild(phoneLink);

  const website = makeElement('p');
  const websiteLink = makeElement('a', 'Visit website');
  websiteLink.href = member.website;
  websiteLink.target = '_blank';
  websiteLink.rel = 'noopener noreferrer';
  website.appendChild(websiteLink);

  contact.append(address, phone, website);
  body.append(
    makeElement('h2', member.name),
    makeElement('p', member.tagline, 'tagline'),
    badge,
    contact
  );
  card.appendChild(body);
  return card;
}

function displayMembers() {
  container.replaceChildren(...members.map(buildCard));
}

/* Switch between grid and list views */
function setView(view) {
  currentView = view;
  container.className = view;
  gridButton.setAttribute('aria-pressed', view === 'grid');
  listButton.setAttribute('aria-pressed', view === 'list');
  displayMembers();
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

getMembers();
