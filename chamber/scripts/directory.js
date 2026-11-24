import { loadMembers, createMemberCard } from "./members.js";

const membersContainer = document.querySelector("#members");
const viewButtons = document.querySelectorAll(".view-toggle button");

async function showMembers() {
  try {
    const members = await loadMembers();
    members.forEach((member) => membersContainer.append(createMemberCard(member)));
  } catch (error) {
    console.error(error);
    membersContainer.innerHTML = "<p>The member list couldn't be loaded. Please try again later.</p>";
  }
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    membersContainer.classList.toggle("list", button.dataset.view === "list");
    viewButtons.forEach((other) => other.setAttribute("aria-pressed", other === button));
  });
});

showMembers();
