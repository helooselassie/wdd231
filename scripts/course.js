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
const buttons = document.querySelectorAll(".filters button");

function showCourses(shown) {
  courseList.innerHTML = "";

  shown.forEach((course) => {
    const item = document.createElement("li");
    item.title = course.title;
    item.innerHTML = `${course.subject} ${course.number}`;
    if (course.completed) {
      item.classList.add("done");
      item.innerHTML += ` <span class="sr">(completed)</span>`;
    }
    courseList.append(item);
  });

  creditTotal.textContent = shown.reduce((total, course) => total + course.credits, 0);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const subject = button.dataset.filter;

    buttons.forEach((b) => b.setAttribute("aria-pressed", b === button));

    if (subject === "all") {
      showCourses(courses);
    } else {
      showCourses(courses.filter((course) => course.subject === subject));
    }
  });
});

showCourses(courses);
