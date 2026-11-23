const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, completed: false },
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false }
];

const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#credit-total");
const filterButtons = document.querySelectorAll(".filters button");

function showCourses(list) {
  courseList.innerHTML = "";

  list.forEach((course) => {
    const item = document.createElement("li");
    item.className = course.completed ? "course done" : "course";
    item.title = `${course.title} (${course.credits} credits)`;
    item.innerHTML = `
      <span>${course.subject} ${course.number}</span>
      <span class="status">${course.completed ? "Completed" : "Not yet taken"}</span>
    `;
    courseList.append(item);
  });

  creditTotal.textContent = list.reduce((sum, course) => sum + course.credits, 0);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    const selected = filter === "all" ? courses : courses.filter((course) => course.subject === filter);

    filterButtons.forEach((other) => other.setAttribute("aria-pressed", other === button));
    showCourses(selected);
  });
});

showCourses(courses);
