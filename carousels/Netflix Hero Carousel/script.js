const titles = [
  {
    eyebrow: "N Original Series",
    title: "DRIFT PROTOCOL",
    desc: "A courier smuggling stolen memory-chips across a flooded megacity has six hours before the data — and her mind — start to decay.",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "N Original Film",
    title: "ASH & ORBIT",
    desc: "When a mining colony goes dark, the last supply pilot in the sector has to decide whether the silence is a malfunction — or a warning.",
    img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "N Original Series",
    title: "REDLINE COUNTY",
    desc: "Two rival smuggling families, one dying highway town, and a sheriff who used to run with both of them before she wore a badge.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "N Original Documentary",
    title: "THE LAST SIGNAL",
    desc: "Inside the decommissioned listening stations that once tracked the sky — and the small crews still keeping them alive off-grid.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
  },
];

const heroBg = document.getElementById('heroBg');
const eyebrowEl = document.getElementById('heroEyebrow');
const titleEl = document.getElementById('heroTitle');
const descEl = document.getElementById('heroDesc');
const thumbRow = document.getElementById('thumbRow');

let current = 0;
let rotateTimer = null;

titles.forEach((t, i) => {
  const thumb = document.createElement('div');
  thumb.className = 'thumb';
  thumb.innerHTML = `<img src="${t.img}" alt="${t.title}" /><div class="bar"></div>`;
  thumb.addEventListener('click', () => selectSlide(i, true));
  thumbRow.appendChild(thumb);
});

const thumbs = Array.from(document.querySelectorAll('.thumb'));

function render() {
  const t = titles[current];
  heroBg.style.backgroundImage = `url('${t.img}')`;
  eyebrowEl.textContent = t.eyebrow;
  titleEl.textContent = t.title;
  descEl.textContent = t.desc;
  thumbs.forEach((th, i) => th.classList.toggle('active', i === current));
}

function selectSlide(i, manual) {
  current = (i + titles.length) % titles.length;
  render();
  if (manual) restartTimer();
}

function restartTimer() {
  clearInterval(rotateTimer);
  rotateTimer = setInterval(() => selectSlide(current + 1, false), 6000);
}

render();
restartTimer();
