const container = document.querySelector(".image-comparison-container");
const slider = document.getElementById("slider");
const topImageWrapper = document.querySelector(".top-image-wrapper");

let isDragging = false;

const handleMouseMove = (e) => {
  if (!isDragging) return;

  const rect = container.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;

  const clampedOffset = Math.max(0, Math.min(offsetX, rect.width));

  const percentage = (clampedOffset / rect.width) * 100;

  slider.style.left = `${percentage}%`;
  topImageWrapper.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
};

slider.addEventListener("mousedown", () => {
  isDragging = true;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", handleMouseMove);
