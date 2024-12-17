const sliderContainer = document.getElementById("slider-container");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentIndex = 0;
const images = sliderContainer.children;

// Dynamically determine how many images to show per slide
const imagesPerSlide = () => {
  if (window.innerWidth >= 1024) return 3; // Large screens
  if (window.innerWidth >= 640) return 2; // Medium screens
  return 1; // Small screens
};

// Update the slider position and button visibility
const updateSlider = () => {
  const slideWidth = sliderContainer.offsetWidth / imagesPerSlide();
  sliderContainer.style.transform = `translateX(-${
    currentIndex * slideWidth
  }px)`;

  // Hide the "prev" button on the first slide
  prevButton.style.display = currentIndex === 0 ? "none" : "block";

  // Hide the "next" button when there are no more slides to show
  const totalSlides = Math.ceil(images.length / imagesPerSlide());
  nextButton.style.display = currentIndex >= totalSlides - 1 ? "none" : "block";
};

// Move to the next slide
nextButton.addEventListener("click", () => {
  const totalSlides = Math.ceil(images.length / imagesPerSlide());
  currentIndex = Math.min(currentIndex + 1, totalSlides - 1);
  updateSlider();
});

// Move to the previous slide
prevButton.addEventListener("click", () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateSlider();
});

// Recalculate and update on window resize
window.addEventListener("resize", updateSlider);

// Initialize
updateSlider();
