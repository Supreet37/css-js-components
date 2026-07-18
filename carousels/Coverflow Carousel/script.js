const items = [
  { title: "Dune Light",        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" },
  { title: "Glass Peaks",       img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80" },
  { title: "Coastal Fog",       img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80" },
  { title: "Amber Fields",      img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80" },
  { title: "Night Terminal",    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80" },
  { title: "Violet Canyon",     img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80" },
  { title: "Still Water",       img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80" },
];

const coverflow = document.getElementById('coverflow');
const titleEl = document.getElementById('trackTitle');
const indexEl = document.getElementById('trackIndex');
const totalEl = document.getElementById('trackTotal');
totalEl.textContent = String(items.length).padStart(2, '0');

let active = 0;

items.forEach((item, i) => {
  const cover = document.createElement('div');
  cover.className = 'cover';
  cover.dataset.index = i;

  const img = document.createElement('img');
  img.src = item.img;
  img.alt = item.title;
  cover.appendChild(img);

  const reflection = document.createElement('div');
  reflection.className = 'reflection';
  const rImg = document.createElement('img');
  rImg.src = item.img;
  rImg.alt = '';
  reflection.appendChild(rImg);
  cover.appendChild(reflection);

  cover.addEventListener('click', () => {
    active = i;
    render();
  });

  coverflow.appendChild(cover);
});

const covers = Array.from(document.querySelectorAll('.cover'));

function render() {
  const total = items.length;
  covers.forEach((cover, i) => {
    let offset = i - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset -= -total;

    const abs = Math.abs(offset);
    let transform, opacity, z, filter;

    if (offset === 0) {
      transform = `translateX(-50%) translateZ(0) rotateY(0deg) scale(1.15)`;
      z = 10;
      opacity = 1;
      filter = 'brightness(1)';
    } else {
      const dir = offset > 0 ? 1 : -1;
      const spread = Math.min(abs, 4);
      transform = `translateX(calc(-50% + ${dir * spread * 110}px)) translateZ(${-spread * 90}px) rotateY(${-dir * 55}deg) scale(${1 - spread * 0.08})`;
      z = 10 - spread;
      opacity = spread > 3 ? 0 : 1 - spread * 0.18;
      filter = `brightness(${1 - spread * 0.15})`;
    }

    cover.style.transform = transform;
    cover.style.zIndex = z;
    cover.style.opacity = opacity;
    cover.style.filter = filter;
  });

  titleEl.textContent = items[active].title;
  indexEl.textContent = String(active + 1).padStart(2, '0');
}

document.getElementById('next').addEventListener('click', () => {
  active = (active + 1) % items.length;
  render();
});
document.getElementById('prev').addEventListener('click', () => {
  active = (active - 1 + items.length) % items.length;
  render();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') document.getElementById('next').click();
  if (e.key === 'ArrowLeft') document.getElementById('prev').click();
});

render();