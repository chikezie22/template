document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const sliderRomance = document.getElementById("slider-2");
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");
  const slides = slider.children;
  const slidesRomance = sliderRomance.children;
  console.log(slidesRomance);
  const slide3images = getSlidesToShow();
  let index = 0;

  // function to slide the sliderRomance;
  const autoSlide = () => {
    const slideWidth = slidesRomance[0].offsetWidth;
    const gap = 8;
    index++;

    if (index >= slidesRomance.length - 1) {
      index = 0;
      sliderRomance.style.transition = `none`;
      sliderRomance.style.transform = `translateX(0px)`;
      // force a reflow
      sliderRomance.offsetHeight;
    } else {
      const offset = slideWidth + gap;
      sliderRomance.style.scrollBehavior = `smooth`;
      sliderRomance.style.transform = `translateX(${-index * offset}px)`;
    }
  };

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
  setInterval(autoSlide, 5000);
});

const carousels = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function updateCarousel() {
  carousels.forEach((item, index) => {
    item.classList.remove("carousel-slide-in", "carousel-slide-out");
    if (index === currentIndex) {
      item.classList.add("carousel-slide-in");
    } else {
      item.classList.add("carousel-slide-out");
    }
  });

  currentIndex = (currentIndex + 1) % carousels.length;
}

setInterval(updateCarousel, 3000); // Change every 3 seconds
