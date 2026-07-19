const dropdown = document.querySelector(".dropdown");
const toggleBtn = document.querySelector(".dropdown-toggle");

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("open");
});

document.addEventListener("click", () => {
  dropdown.classList.remove("open");
});
