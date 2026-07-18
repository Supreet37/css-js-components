const photos = [
  { img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80", cap: "Lisbon, 6am" },
  { img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80", cap: "The old trail" },
  { img: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=600&q=80", cap: "Somewhere north" },
  { img: "https://images.unsplash.com/photo-1476611317561-60117649dd94?auto=format&fit=crop&w=600&q=80", cap: "Harvest week" },
  { img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80", cap: "Forest quiet" },
];

let order = photos.map((_, i) => i);
const stack = document.getElementById('stack');

function render(exitDir) {
  stack.innerHTML = '';
  order.forEach((photoIndex, pos) => {
    const photo = photos[photoIndex];
    const card = document.createElement('div');
    card.className = 'card';
    const depth = pos;
    const rot = (photoIndex % 2 === 0 ? 1 : -1) * (depth === 0 ? 0 : 2 + depth);
    card.style.transform = `translateY(${depth * 8}px) scale(${1 - depth * 0.045}) rotate(${rot}deg)`;
    card.style.zIndex = order.length - pos;
    card.style.opacity = depth > 4 ? 0 : 1;

    card.innerHTML = `<img src="${photo.img}" alt="${photo.cap}"/><div class="cap">${photo.cap}</div>`;

    if (depth === 0) {
      card.addEventListener('click', () => cycle('next'));
    }
    stack.appendChild(card);
  });
}

function cycle(dir) {
  const topCard = stack.firstElementChild;
  if (dir === 'next') {
    topCard.style.transition = 'transform .45s ease, opacity .45s ease';
    topCard.style.transform += ' translateX(120%) rotate(20deg)';
    topCard.style.opacity = '0';
    setTimeout(() => {
      order.push(order.shift());
      render();
    }, 260);
  } else {
    order.unshift(order.pop());
    render();
    const topCard2 = stack.firstElementChild;
    topCard2.style.transform += ' translateX(-120%) rotate(-20deg)';
    topCard2.style.opacity = '0';
    requestAnimationFrame(() => {
      topCard2.style.transition = 'transform .45s ease, opacity .45s ease';
      requestAnimationFrame(() => {
        topCard2.style.transform = topCard2.style.transform.replace(/ translateX\([^)]*\) rotate\([^)]*\)$/, '');
        topCard2.style.opacity = '1';
      });
    });
  }
}

document.getElementById('next').addEventListener('click', () => cycle('next'));
document.getElementById('prev').addEventListener('click', () => cycle('prev'));

render();
