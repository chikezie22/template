document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");
  const slides = slider.children;
  const slide3images = getSlidesToShow();

  function getSlidesToShow() {
    if (window.innerWidth < 768) {
      return 1; // Mobile: 1 slide
    } else if (window.innerWidth < 1024) {
      return 2; // Tablet: 2 slides
    }
    return 3; // Desktop: 3 slides
  }

  let currentIndex = 0;
  let slidesToShow = getSlidesToShow();

  function updateSliderPosition() {
    const slideWidth = slides[0].offsetWidth;
    const gap = 10;
    const offset = slideWidth + gap;
    slider.style.transform = `translateX(${-currentIndex * offset}px)`;
  }

  function updateButtons() {
    prevButton.style.display = currentIndex === 0 ? "none" : "block";
    nextButton.style.display = currentIndex >= slides.length - slidesToShow ? "none" : "block";
  }

  nextButton.addEventListener("click", function () {
    if (currentIndex < slides.length - slidesToShow) {
      currentIndex += slide3images;
      updateSliderPosition();
      updateButtons();
    }
  });

  prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex -= slide3images;
      updateSliderPosition();
      updateButtons();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      slidesToShow = getSlidesToShow();
      if (currentIndex > slides.length - slidesToShow) {
        currentIndex = slides.length - slidesToShow;
      }
      updateSliderPosition();
      updateButtons();
    }, 250);
  });

  // Initial setup
  updateButtons();
});
