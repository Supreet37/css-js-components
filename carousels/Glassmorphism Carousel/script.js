const slides = [
  { img: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&w=700&q=80", title: "Aurora Deck", sub: "Frosted UI kit, vol. 01" },
  { img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=700&q=80", title: "Prism Grid", sub: "Frosted UI kit, vol. 02" },
  { img: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=700&q=80", title: "Nebula Panel", sub: "Frosted UI kit, vol. 03" },
  { img: "https://images.unsplash.com/photo-1636955779321-819753cd1741?auto=format&fit=crop&w=700&q=80", title: "Glacier Tile", sub: "Frosted UI kit, vol. 04" },
];

const imgEl = document.getElementById('slideImg');
const titleEl = document.getElementById('slideTitle');
const subEl = document.getElementById('slideSub');
const dotsEl = document.getElementById('dots');

let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

function render() {
  const slide = slides[current];
  imgEl.classList.remove('show');
  setTimeout(() => {
    imgEl.src = slide.img;
    imgEl.alt = slide.title;
    imgEl.onload = () => imgEl.classList.add('show');
  }, 150);
  titleEl.textContent = slide.title;
  subEl.textContent = slide.sub;
  Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle('active', i === current));
}

function goTo(i) {
  current = (i + slides.length) % slides.length;
  render();
}

document.getElementById('next').addEventListener('click', () => goTo(current + 1));
document.getElementById('prev').addEventListener('click', () => goTo(current - 1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft') goTo(current - 1);
});

render();
