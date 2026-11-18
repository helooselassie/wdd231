const params = new URLSearchParams(window.location.search);

function showValue(elementId, paramName, fallback = "Not provided") {
  const el = document.querySelector(`#${elementId}`);
  if (!el) return;
  const value = params.get(paramName);
  el.textContent = value && value.trim() !== "" ? value : fallback;
}

showValue("outFirstName", "firstName");
showValue("outLastName", "lastName");
showValue("outEmail", "email");
showValue("outPhone", "phone");
showValue("outOrgName", "orgName");
showValue("outMembershipLevel", "membershipLevel");

const rawTimestamp = params.get("timestamp");
const timestampEl = document.querySelector("#outTimestamp");
if (timestampEl) {
  if (rawTimestamp) {
    const parsed = new Date(rawTimestamp);
    timestampEl.textContent = Number.isNaN(parsed.getTime())
      ? rawTimestamp
      : parsed.toLocaleString();
  } else {
    timestampEl.textContent = "Not provided";
  }
}
