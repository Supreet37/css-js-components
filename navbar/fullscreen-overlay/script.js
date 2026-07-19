const toggle = document.getElementById("toggle");
const overlay = document.getElementById("overlay");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  overlay.classList.toggle("open");
});

document.querySelectorAll(".overlay-links a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.classList.remove("open");
    overlay.classList.remove("open");
  });
});
