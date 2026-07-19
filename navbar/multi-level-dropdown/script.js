const toggles = document.querySelectorAll(".dropdown-toggle");

toggles.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const parent = btn.closest(".dropdown");
    const isOpen = parent.classList.contains("open");

    // close sibling dropdowns at the same level
    const siblings = parent.parentElement.querySelectorAll(":scope > .dropdown.open");
    siblings.forEach((sib) => sib.classList.remove("open"));

    parent.classList.toggle("open", !isOpen);
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
});
