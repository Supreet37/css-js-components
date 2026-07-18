const slides = [
  {
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
    title: "The Quiet Range",
    text: "Long light over the ridge line, an hour before the valley wakes.",
  },
  {
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80",
    title: "Low Tide Notes",
    text: "Salt air, flat water, and a coastline that empties out by nine.",
  },
  {
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80",
    title: "Field Season",
    text: "Wheat gone gold in August, weeks before the first machines arrive.",
  },
  {
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
    title: "Above the Clouds",
    text: "Where the peaks keep their own weather, apart from the rest of the range.",
  },
];

const track = document.getElementById('track');
const rungs = document.getElementById('rungs');
let current = 0;

slides.forEach((s, i) => {
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.innerHTML = `
    <img src="${s.img}" alt="${s.title}" />
    <div class="cap">
      <span class="num">${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}</span>
      <h2>${s.title}</h2>
      <p>${s.text}</p>
    </div>
  `;
  track.appendChild(slide);

  const rung = document.createElement('div');
  rung.className = 'rung';
  rung.addEventListener('click', () => goTo(i));
  rungs.appendChild(rung);
});

function render() {
  track.style.transform = `translateY(-${current * 100}vh)`;
  Array.from(rungs.children).forEach((r, i) => r.classList.toggle('active', i === current));
}

function goTo(i) {
  current = (i + slides.length) % slides.length;
  render();
}

document.getElementById('down').addEventListener('click', () => goTo(current + 1));
document.getElementById('up').addEventListener('click', () => goTo(current - 1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') goTo(current + 1);
  if (e.key === 'ArrowUp') goTo(current - 1);
});

let touchStartY = null;
document.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
document.addEventListener('touchend', (e) => {
  if (touchStartY === null) return;
  const diff = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  touchStartY = null;
});

let wheelLock = false;
document.addEventListener('wheel', (e) => {
  if (wheelLock) return;
  wheelLock = true;
  goTo(current + (e.deltaY > 0 ? 1 : -1));
  setTimeout(() => { wheelLock = false; }, 900);
});

render();
