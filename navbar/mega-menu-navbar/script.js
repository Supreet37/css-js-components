const megaItem = document.getElementById("megaItem");
const toggleBtn = megaItem.querySelector(".mega-toggle");

let hoverTimeout;

function open() {
  clearTimeout(hoverTimeout);
  megaItem.classList.add("open");
}

function close() {
  hoverTimeout = setTimeout(() => megaItem.classList.remove("open"), 150);
}

// desktop hover
megaItem.addEventListener("mouseenter", open);
megaItem.addEventListener("mouseleave", close);

// touch / click fallback
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  megaItem.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!megaItem.contains(e.target)) megaItem.classList.remove("open");
});
