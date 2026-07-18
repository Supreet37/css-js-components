const posters = [
  { img: "https://images.unsplash.com/photo-1489599162946-4b9dfd8b9c50?auto=format&fit=crop&w=400&q=80", tag: "RED CURTAIN" },
  { img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80", tag: "NIGHT REEL" },
  { img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=400&q=80", tag: "GOLDEN HOUR" },
  { img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80", tag: "BACKLOT" },
  { img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80", tag: "PREMIERE" },
  { img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=400&q=80", tag: "MATINEE" },
];

function buildTrack(el, list) {
  const doubled = [...list, ...list];
  el.innerHTML = doubled.map(p => `
    <div class="poster">
      <img src="${p.img}" alt="${p.tag}" />
      <div class="tag">${p.tag}</div>
    </div>
  `).join('');
}

buildTrack(document.getElementById('trackA'), posters);
buildTrack(document.getElementById('trackB'), [...posters].reverse());

const toggleBtn = document.getElementById('toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('paused');
  toggleBtn.textContent = document.body.classList.contains('paused') ? 'Resume reels' : 'Pause reels';
});
