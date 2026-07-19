const nav = document.getElementById("nav");
const hero = document.querySelector(".hero");

function updateNav() {
  const heroBottom = hero.offsetHeight - 80;
  nav.classList.toggle("solid", window.scrollY > heroBottom);
}

window.addEventListener("scroll", updateNav);
updateNav();
