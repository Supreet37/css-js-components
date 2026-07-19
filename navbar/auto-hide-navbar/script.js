const nav = document.getElementById("nav");
let lastY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;

  if (currentY > lastY && currentY > 80) {
    nav.classList.add("hide");
  } else {
    nav.classList.remove("hide");
  }

  lastY = currentY;
});
