const dock = document.getElementById("dock");
const items = document.querySelectorAll(".dock-item");

const MAX_SCALE = 1.7;
const DISTANCE = 140; // px radius of influence

dock.addEventListener("mousemove", (e) => {
  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const dx = e.clientX - itemCenterX;
    const distance = Math.abs(dx);

    let scale = 1;
    if (distance < DISTANCE) {
      scale = 1 + (MAX_SCALE - 1) * (1 - distance / DISTANCE);
    }

    item.style.transform = `scale(${scale})`;
  });
});

dock.addEventListener("mouseleave", () => {
  items.forEach((item) => (item.style.transform = "scale(1)"));
});
