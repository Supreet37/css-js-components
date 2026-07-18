const people = [
  { name: "Maya, 27",   sub: "Ceramicist · 3km away", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80" },
  { name: "Theo, 30",   sub: "Sound engineer · 5km away", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" },
  { name: "Ines, 25",   sub: "Trail runner · 2km away", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80" },
  { name: "Sam, 29",    sub: "Line cook · 8km away", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=500&q=80" },
  { name: "Priya, 26",  sub: "Illustrator · 1km away", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=80" },
];

const deck = document.getElementById('deck');
const history = [];
let queue = [...people];

function buildCard(person) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${person.img}" alt="${person.name}" />
    <div class="stamp like">LIKE</div>
    <div class="stamp nope">NOPE</div>
    <div class="info"><h3>${person.name}</h3><p>${person.sub}</p></div>
  `;
  attachDrag(card);
  return card;
}

function renderDeck() {
  deck.innerHTML = '';
  if (queue.length === 0) {
    deck.innerHTML = `<div class="empty-state"><h3>That's everyone nearby</h3><p>Tap rewind to see the last profile again.</p></div>`;
    return;
  }
  queue.slice(0, 3).reverse().forEach((person, i) => {
    const card = buildCard(person);
    const depthFromTop = Math.min(queue.length, 3) - 1 - i;
    card.style.transform = `translateY(${depthFromTop * -8}px) scale(${1 - depthFromTop * 0.04})`;
    card.style.zIndex = 10 - depthFromTop;
    deck.appendChild(card);
  });
}

function attachDrag(card) {
  let startX = 0, startY = 0, dx = 0, dy = 0, dragging = false;
  const likeStamp = card.querySelector('.stamp.like');
  const nopeStamp = card.querySelector('.stamp.nope');

  function isTopCard() { return card === deck.lastElementChild; }

  function onDown(e) {
    if (!isTopCard()) return;
    dragging = true;
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    card.style.transition = 'none';
  }

  function onMove(e) {
    if (!dragging) return;
    const point = e.touches ? e.touches[0] : e;
    dx = point.clientX - startX;
    dy = point.clientY - startY;
    const rotate = dx / 14;
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`;
    likeStamp.style.opacity = Math.max(0, Math.min(1, dx / 90));
    nopeStamp.style.opacity = Math.max(0, Math.min(1, -dx / 90));
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    card.style.transition = 'transform .35s ease';
    if (Math.abs(dx) > 100) {
      const dir = dx > 0 ? 1 : -1;
      card.style.transform = `translate(${dir * 700}px, ${dy}px) rotate(${dir * 30}deg)`;
      const swiped = queue.shift();
      history.push(swiped);
      setTimeout(renderDeck, 250);
    } else {
      card.style.transform = 'translate(0,0) rotate(0)';
      likeStamp.style.opacity = 0;
      nopeStamp.style.opacity = 0;
    }
    dx = 0; dy = 0;
  }

  card.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  card.addEventListener('touchstart', onDown, { passive: true });
  card.addEventListener('touchmove', onMove, { passive: true });
  card.addEventListener('touchend', onUp);
}

function swipeTop(direction) {
  const topCard = deck.lastElementChild;
  if (!topCard || queue.length === 0) return;
  topCard.style.transition = 'transform .35s ease';
  topCard.style.transform = `translate(${direction * 700}px, -40px) rotate(${direction * 30}deg)`;
  const swiped = queue.shift();
  history.push(swiped);
  setTimeout(renderDeck, 250);
}

document.getElementById('like').addEventListener('click', () => swipeTop(1));
document.getElementById('nope').addEventListener('click', () => swipeTop(-1));
document.getElementById('rewind').addEventListener('click', () => {
  const last = history.pop();
  if (last) {
    queue.unshift(last);
    renderDeck();
  }
});

renderDeck();
