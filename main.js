const container = document.querySelector(".image-comparison-container");
const slider = document.getElementById("slider");
const topImageWrapper = document.querySelector(".top-image-wrapper");
const bottomImageElement = document.getElementById("bottom-image");
const topImageElement = document.getElementById("top-image");

const bottomImageUpload = document.getElementById("bottom-image-upload");
const topImageUpload = document.getElementById("top-image-upload");

let isDragging = false;

// Function to handle image upload and update the corresponding image
const handleImageUpload = (event, imageElement) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageElement.src = e.target.result; // Set the uploaded image as the src
    };
    reader.readAsDataURL(file);
  }
};

// Event listeners for image uploads
bottomImageUpload.addEventListener("change", (e) =>
  handleImageUpload(e, bottomImageElement)
);
topImageUpload.addEventListener("change", (e) =>
  handleImageUpload(e, topImageElement)
);

// Function to handle the slider drag
const handleMouseMove = (e) => {
  if (!isDragging) return;

  // Get the mouse position relative to the container
  const rect = container.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;

  // Clamp the value between 0 and the container's width
  const clampedOffset = Math.max(0, Math.min(offsetX, rect.width));

  // Calculate the percentage for the clip-path
  const percentage = (clampedOffset / rect.width) * 100;

  // Update the slider position and clip-path
  slider.style.left = `${percentage}%`;
  topImageWrapper.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
};

// Add event listeners for dragging
slider.addEventListener("mousedown", () => {
  isDragging = true;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", handleMouseMove);
