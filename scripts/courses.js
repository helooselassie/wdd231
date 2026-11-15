// courses.js
//
// ⚠️ PLACEHOLDER DATA: the assignment links to a specific "Course List
// Array" for your certificate. I don't have access to that link, so the
// array below is a representative example built from the public
// Web and Computer Programming certificate course list, with "completed"
// guesses you MUST correct. Replace the whole array with the real one
// from your assignment page before you submit, then just update each
// course's "completed" value to true/false to match your own progress.

const courses = [
  {
    code: "CSE 110",
    name: "Introduction to Programming",
    credits: 2,
    certificate: "cse",
    completed: true,
  },
  {
    code: "WDD 130",
    name: "Web Fundamentals",
    credits: 2,
    certificate: "wdd",
    completed: true,
  },
  {
    code: "CSE 111",
    name: "Programming with Functions",
    credits: 3,
    certificate: "cse",
    completed: true,
  },
  {
    code: "WDD 131",
    name: "Dynamic Web Fundamentals",
    credits: 3,
    certificate: "wdd",
    completed: true,
  },
  {
    code: "CSE 210",
    name: "Programming with Classes",
    credits: 3,
    certificate: "cse",
    completed: false,
  },
  {
    code: "WDD 231",
    name: "Web Frontend Development",
    credits: 3,
    certificate: "wdd",
    completed: false,
  },
];

const cardContainer = document.getElementById("course-cards");
const creditTotalEl = document.getElementById("credit-total");
const filterButtons = document.querySelectorAll(".filter-btn");

// Builds and injects one card per course in the array passed in.
// Because this reads from the "courses" array instead of writing HTML
// by hand, the page updates automatically if the data changes.
function renderCourses(courseList) {
  cardContainer.innerHTML = "";

  courseList.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>${course.credits} credits</p>
    `;

    cardContainer.appendChild(card);
  });

  updateCreditTotal(courseList);
}

// reduce() walks the array once, adding each course's credits onto a
// running total, starting from 0. It reflects only what is currently
// displayed, so the number changes as you filter.
function updateCreditTotal(courseList) {
  const total = courseList.reduce((sum, course) => sum + course.credits, 0);
  creditTotalEl.textContent = total;
}

// filter() returns a new array containing only the courses that match,
// without changing the original "courses" array at all.
function filterCourses(category) {
  if (category === "all") {
    return courses;
  }
  return courses.filter((course) => course.certificate === category);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selected = button.getAttribute("data-filter");
    renderCourses(filterCourses(selected));
  });
});

renderCourses(courses);
