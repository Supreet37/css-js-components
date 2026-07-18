const items = [
  { label: "Marble Hall",   img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh55yd_3Ge9eDROV-Upm5rdOZUrM-hpyPCkxGbTprM-UKkZYvVi3Q5vLP5&s=10" },
  { label: "Cedar Study",   img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80" },
  { label: "Glass Atrium",  img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=500&q=80" },
  { label: "Stone Corridor",img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80" },
  { label: "Copper Room",   img: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=500&q=80" },
  { label: "North Wing",    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=80" },
];

const ring = document.getElementById('ring');
const label = document.getElementById('label');
const total = items.length;
const angle = 360 / total;
const radius = 340;

let current = 0;

items.forEach((item, i) => {
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.style.transform = `rotateY(${i * angle}deg) translateZ(${radius}px)`;
  panel.innerHTML = `<img src="${item.img}" alt="${item.label}" />`;
  panel.addEventListener('click', () => {
    current = i;
    render();
  });
  ring.appendChild(panel);
});

const panels = Array.from(document.querySelectorAll('.panel'));

function render() {
  ring.style.transform = `rotateY(${-current * angle}deg)`;
  panels.forEach((p, i) => p.classList.toggle('active', i === current));
  label.textContent = items[current].label;
}

document.getElementById('next').addEventListener('click', () => {
  current = (current + 1) % total;
  render();
});
document.getElementById('prev').addEventListener('click', () => {
  current = (current - 1 + total) % total;
  render();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') document.getElementById('next').click();
  if (e.key === 'ArrowLeft') document.getElementById('prev').click();
});

render();
