// Replace this array with the official one from the assignment page,
// then set completed: true for the courses you have finished.
const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: false },
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: false }
];

const courseList = document.querySelector("#course-list");
const creditsText = document.querySelector("#credits");
const filterButtons = document.querySelectorAll(".filters button");

function showCourses(list) {
  courseList.innerHTML = "";
  list.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    if (course.completed) card.classList.add("completed");
    card.textContent = `${course.subject} ${course.number}`;
    courseList.appendChild(card);
  });

  const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
  creditsText.textContent = `Total credits for the courses listed: ${totalCredits}`;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    const filtered = filter === "all" ? courses : courses.filter(c => c.subject === filter);
    filterButtons.forEach(b => b.classList.toggle("selected", b === button));
    showCourses(filtered);
  });
});

showCourses(courses);
