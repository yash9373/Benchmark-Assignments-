class Carousel {
  constructor(images, imageElementId, prevButtonId, nextButtonId) {
    this.images = images;
    this.index = 0;
    this.imageElement = document.getElementById(imageElementId);
    this.prevButton = document.getElementById(prevButtonId);
    this.nextButton = document.getElementById(nextButtonId);

    if (this.images.length > 0) {
      this.imageElement.src = this.images[this.index];
    }

    this.prevButton.addEventListener("click", () => this.prevImage());
    this.nextButton.addEventListener("click", () => this.nextImage());

    // this.imageElement.draggable = true;
    // this.imageElement.addEventListener("dragstart", (e) => this.dragStart(e));
  }

  updateImage() {
    if (this.images.length === 0) return;
    this.imageElement.style.opacity = 0;
    setTimeout(() => {
      this.imageElement.src = this.images[this.index];
      this.imageElement.style.opacity = 1;
    }, 400);
  }

  nextImage() {
    if (this.images.length === 0) return;
    this.index = (this.index + 1) % this.images.length;
    this.updateImage();
  }

  prevImage() {
    if (this.images.length === 0) return;
    this.index = (this.index - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  //   dragStart(e) {
  //     e.dataTransfer.setData("text/plain", this.images[this.index]);
  //     e.dataTransfer.setData("index", this.index); // Store the current index
}

// Image Arrays
const allImages = [
  "images/thumb-1920-1357330.jpeg",
  "images/thumbbig-1372162.webp",
  "images/thumbbig-1342060.webp",
  "images/thumbbig-1345614.webp",
];

// const onePieceImages = [
//   "images/thumbbig-1372162.webp",
//   "images/thumbbig-1342060.webp",
// ];

// const soloLevelingImages = ["images/thumbbig-1342060.webp"];

// // Initialize Carousels
const allCarousel = new Carousel(
  allImages,
  "allcarouselImage",
  "all-prev",
  "all-next"
);
// const onePieceCarousel = new Carousel(
//   onePieceImages,
//   "onepiececarouselImage",
//   "onepiece-prev",
//   "onepiece-next"
// );
// const soloLevelingCarousel = new Carousel(
//   soloLevelingImages,
//   "sololevelingcarouselImage",
//   "sololeveling-prev",
//   "sololeveling-next"
// );

// // Drag and Drop Implementation
// function setupDropTarget(dropTargetId, targetImages, targetCarousel) {
//   const dropTarget = document.getElementById(dropTargetId);

//   dropTarget.addEventListener("dragover", function (e) {
//     e.preventDefault();
//   });

//   dropTarget.addEventListener("drop", function (e) {
//     e.preventDefault();

//     const droppedImage = e.dataTransfer.getData("text/plain");
//     const sourceIndex = parseInt(e.dataTransfer.getData("index"), 10);

//     // Find and remove the image from the original array
//     [allImages, onePieceImages, soloLevelingImages].forEach((imageArray) => {
//       const index = imageArray.indexOf(droppedImage);
//       if (index !== -1) {
//         imageArray.splice(index, 1);
//       }
//     });

//     // Add the image to the target array at the current index of the target carousel
//     targetImages.splice(targetCarousel.index, 0, droppedImage);
//     targetCarousel.updateImage();

//     // If the target carousel's image array changed, update the current index
//     targetCarousel.index = targetImages.indexOf(droppedImage);
//     targetCarousel.updateImage();
//   });
// }

// setupDropTarget("onepiececarouselImage", onePieceImages, onePieceCarousel);
// setupDropTarget(
//   "sololevelingcarouselImage",
//   soloLevelingImages,
//   soloLevelingCarousel
// );
// setupDropTarget("allcarouselImage", allImages, allCarousel);
