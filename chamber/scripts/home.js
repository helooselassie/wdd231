import { loadMembers, createMemberCard } from "./members.js";

const spotlightContainer = document.querySelector("#spotlights");
const spotlightCount = 3;

// Fisher-Yates, so every member has the same chance of landing in the first slots
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function showSpotlights() {
  try {
    const members = await loadMembers();
    const premium = members.filter((member) => member.level >= 2);
    shuffle(premium)
      .slice(0, spotlightCount)
      .forEach((member) => spotlightContainer.append(createMemberCard(member, "h3")));
  } catch (error) {
    console.error(error);
    spotlightContainer.innerHTML = "<p>Member spotlights aren't available right now.</p>";
  }
}

showSpotlights();
