const membersContainer = document.querySelector("#members");
const viewButtons = document.querySelectorAll(".view-toggle button");
const levelNames = { 1: "Member", 2: "Silver", 3: "Gold" };

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const members = await response.json();
    showMembers(members);
  } catch (error) {
    console.error(error);
    membersContainer.innerHTML = "<p>The member list couldn't be loaded. Please try again later.</p>";
  }
}

function showMembers(members) {
  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = "member";

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `Logo of ${member.name}`;
    image.width = 200;
    image.height = 120;
    image.loading = "lazy";

    const body = document.createElement("div");
    body.className = "member-body";
    body.innerHTML = `
      <h2>${member.name}</h2>
      <p class="category">${member.category}</p>
      <p>${member.address}</p>
      <p><a href="tel:${member.phone.replaceAll(" ", "")}">${member.phone}</a></p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit website</a>
      <span class="level level-${member.level}">${levelNames[member.level]}</span>
    `;

    card.append(image, body);
    membersContainer.append(card);
  });
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    membersContainer.classList.toggle("list", button.dataset.view === "list");
    viewButtons.forEach((other) => other.setAttribute("aria-pressed", other === button));
  });
});

getMembers();
