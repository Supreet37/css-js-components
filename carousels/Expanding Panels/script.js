const looks = [
  { title: "Camel Coat",   img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=80" },
  { title: "Rust Knit",    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80" },
  { title: "Denim Layer",  img: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80" },
  { title: "Studio Wool",  img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80" },
  { title: "Evening Silk", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80" },
];

const panelsEl = document.getElementById('panels');

looks.forEach((look, i) => {
  const panel = document.createElement('div');
  panel.className = 'panel';
  if (i === 0) panel.classList.add('expanded');
  panel.tabIndex = 0;
  panel.innerHTML = `
    <img src="${look.img}" alt="${look.title}" />
    <span class="index">${String(i + 1).padStart(2, '0')}</span>
    <span class="title">${look.title}</span>
  `;

  const expand = () => {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('expanded'));
    panel.classList.add('expanded');
  };

  panel.addEventListener('mouseenter', expand);
  panel.addEventListener('click', expand);
  panel.addEventListener('focus', expand);

  panelsEl.appendChild(panel);
});
