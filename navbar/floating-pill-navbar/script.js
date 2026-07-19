const nav = document.getElementById("pillNav");
const highlight = document.getElementById("pillHighlight");
const links = document.querySelectorAll(".pill-link");

function moveHighlight(target) {
  const navRect = nav.getBoundingClientRect();
  const rect = target.getBoundingClientRect();

  highlight.style.width = `${rect.width}px`;
  highlight.style.transform = `translateX(${rect.left - navRect.left - 6}px)`;
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    moveHighlight(link);
  });
});

window.addEventListener("load", () => moveHighlight(document.querySelector(".pill-link.active")));
window.addEventListener("resize", () => moveHighlight(document.querySelector(".pill-link.active")));
