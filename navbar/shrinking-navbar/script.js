const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("shrink", window.scrollY > 60);
});
