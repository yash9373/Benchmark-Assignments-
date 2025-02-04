// Get the boxes and items
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const items = document.querySelectorAll(".item");

items.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", (e) => {
    item.classList.remove("dragging");
  });
});

[box1, box2].forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    box.classList.add("drag-over");
  });

  box.addEventListener("dragleave", (e) => {
    box.classList.remove("drag-over");
  });

  box.addEventListener("drop", (e) => {
    e.preventDefault();
    box.classList.remove("drag-over");

    const draggedItem = document.querySelector(".dragging");

    if (box !== draggedItem.parentElement) {
      box.appendChild(draggedItem);
    }
  });
});
