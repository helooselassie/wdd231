const directoryEl = document.querySelector("#directory");
const gridBtn = document.querySelector("#gridViewBtn");
const listBtn = document.querySelector("#listViewBtn");

const membershipLabels = {
  1: "Member",
  2: "Silver",
  3: "Gold",
};

async function getMembers() {
  const response = await fetch("data/members.json");
  if (!response.ok) {
    throw new Error(`Could not load member data: ${response.status}`);
  }
  const data = await response.json();
  return data.members;
}

function buildCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";

  const img = document.createElement("img");
  img.src = `images/${member.image}`;
  img.alt = `${member.name} logo`;
  img.loading = "lazy";
  img.width = 160;
  img.height = 160;

  const badge = document.createElement("span");
  badge.className = `membership-badge membership-${member.membership}`;
  badge.textContent = membershipLabels[member.membership] ?? "Member";

  const name = document.createElement("h2");
  name.className = "member-name";
  name.textContent = member.name;

  const tagline = document.createElement("p");
  tagline.className = "member-tagline";
  tagline.textContent = `${member.category} · ${member.city}`;

  const address = document.createElement("p");
  address.className = "member-meta";
  address.innerHTML = `<strong>Address:</strong> ${member.address}`;

  const phone = document.createElement("p");
  phone.className = "member-meta";
  phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

  const url = document.createElement("p");
  url.className = "member-meta";
  const link = document.createElement("a");
  link.href = member.website;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = member.website.replace(/^https?:\/\//, "");
  url.innerHTML = "<strong>Website:</strong> ";
  url.appendChild(link);

  card.append(badge, img, name, tagline, address, phone, url);
  return card;
}

async function renderDirectory() {
  try {
    const members = await getMembers();
    directoryEl.innerHTML = "";
    members.forEach((member) => {
      directoryEl.appendChild(buildCard(member));
    });
  } catch (error) {
    directoryEl.innerHTML = `<p>Sorry, member information could not be loaded right now.</p>`;
    console.error(error);
  }
}

function setView(view) {
  const isGrid = view === "grid";
  directoryEl.classList.toggle("list-view", !isGrid);
  gridBtn.setAttribute("aria-pressed", String(isGrid));
  listBtn.setAttribute("aria-pressed", String(!isGrid));
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

renderDirectory();
