const summary = document.querySelector('#summary');
const params = new URLSearchParams(window.location.search);

const fields = [
  ['First name', 'firstName'],
  ['Last name', 'lastName'],
  ['Email', 'email'],
  ['Mobile phone', 'phone'],
  ['Business / organization', 'organization']
];

function formatTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' });
}

const rows = [];

for (const [label, key] of fields) {
  rows.push([label, params.get(key)]);
}
const timestamp = params.get('timestamp');
rows.push(['Submitted on', timestamp ? formatTimestamp(timestamp) : null]);

const items = rows.map(([label, value]) => {
  const row = makeElement('div', '', 'summary-row');
  // textContent keeps anything typed into the form from being treated as HTML
  row.append(makeElement('dt', label), makeElement('dd', value || 'Not provided'));
  return row;
});

summary.replaceChildren(...items);
