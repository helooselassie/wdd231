const summary = document.querySelector("#summary");
const params = new URLSearchParams(window.location.search);

const fields = [
  ["First name", "fname"],
  ["Last name", "lname"],
  ["Email", "email"],
  ["Mobile phone", "phone"],
  ["Business or organization", "organization"],
  ["Submitted", "timestamp"]
];

function formatTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });
}

fields.forEach(([label, key]) => {
  const value = params.get(key);
  if (!value) return;

  const term = document.createElement("dt");
  term.textContent = label;

  const detail = document.createElement("dd");
  detail.textContent = key === "timestamp" ? formatTimestamp(value) : value;

  summary.append(term, detail);
});

if (!summary.children.length) {
  summary.insertAdjacentHTML("beforebegin", '<p>No application details found. <a href="join.html">Return to the form</a>.</p>');
}
