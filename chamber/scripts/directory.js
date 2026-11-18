const memberContainer = document.querySelector("#memberContainer");
const gridViewBtn = document.querySelector("#gridViewBtn");
const listViewBtn = document.querySelector("#listViewBtn");

const levelNames = {
  1: "Member",
  2: "Silver Member",
  3: "Gold Member",
};

// Fetch the member data using fetch + async/await, then render it.
async function getMemberData() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    memberContainer.innerHTML = `<p class="loading">Sorry, the member directory could not be loaded right now.</p>`;
    console.error("Error fetching member data:", error);
  }
}

function displayMembers(members) {
  memberContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="72" height="72" />
      <h2>${member.name}</h2>
      <p class="card-address">${member.address}</p>
      <p class="card-phone">${member.phone}</p>
      <a class="card-website" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      <span class="badge level-${member.membershipLevel}">${levelNames[member.membershipLevel]}</span>
    `;

    memberContainer.appendChild(card);
  });
}

// Grid / list toggle
function setView(view) {
  const isGrid = view === "grid";
  memberContainer.classList.toggle("grid-view", isGrid);
  memberContainer.classList.toggle("list-view", !isGrid);
  gridViewBtn.setAttribute("aria-pressed", isGrid);
  listViewBtn.setAttribute("aria-pressed", !isGrid);
}

gridViewBtn.addEventListener("click", () => setView("grid"));
listViewBtn.addEventListener("click", () => setView("list"));

getMemberData();
