export const levelNames = { 1: "Member", 2: "Silver", 3: "Gold" };

export async function loadMembers() {
  const response = await fetch("data/members.json");
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export function createMemberCard(member, headingTag = "h2") {
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
    <${headingTag}>${member.name}</${headingTag}>
    <p class="category">${member.category}</p>
    <p>${member.address}</p>
    <p><a href="tel:${member.phone.replaceAll(" ", "")}">${member.phone}</a></p>
    <a href="${member.website}" target="_blank" rel="noopener">Visit website</a>
    <span class="level level-${member.level}">${levelNames[member.level]}</span>
  `;

  card.append(image, body);
  return card;
}
