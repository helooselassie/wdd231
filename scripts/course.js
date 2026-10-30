// Replace this array with the official Course List Array from the assignment.
// Set completed to true for the courses you have finished.
const courses = [
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
  { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, completed: false },
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false }
];

const list = document.querySelector('#course-list');
const creditsEl = document.querySelector('#credits');
const buttons = document.querySelectorAll('.filters button');

function display(items) {
  list.innerHTML = '';
  items.forEach(c => {
    const card = document.createElement('div');
    card.className = c.completed ? 'card done' : 'card';
    card.textContent = `${c.subject} ${c.number}`;
    if (c.completed) card.setAttribute('aria-label', `${c.subject} ${c.number}, completed`);
    card.title = c.title;
    list.appendChild(card);
  });
  creditsEl.textContent = items.reduce((sum, c) => sum + c.credits, 0);
}

buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => b.classList.remove('current'));
  btn.classList.add('current');
  const f = btn.dataset.filter;
  display(f === 'all' ? courses : courses.filter(c => c.subject === f));
}));

display(courses);
