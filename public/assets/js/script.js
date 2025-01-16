document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const sliderRomance = document.getElementById("slider-2");
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");
  const slides = slider.children;
  const slidesRomance = sliderRomance.children;

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
    // const gap = 10;
    const gap = parseInt(getComputedStyle(slider).gap) || 0;
    const offset = slideWidth + gap;
    slider.style.transform = `translateX(${-currentIndex * offset}px)`;
  }

  function updateButtons() {
    prevButton.style.display = currentIndex === 0 ? "none" : "block";
    nextButton.style.display = currentIndex >= slides.length - slidesToShow ? "none" : "block";
  }

  nextButton.addEventListener("click", function () {
    if (currentIndex < slides.length - slidesToShow) {
      currentIndex += slidesToShow;
      updateSliderPosition();
      updateButtons();
    }
  });

  prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex -= slidesToShow;
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

  const track = document.querySelector(".carousel-track");
  const groups = document.querySelectorAll(".carousel-track > div");
  const groupWidth = 1193; // Width of each group
  let carouselIndex = 0;

  // Function to slide the carousel
  function slideCarousel() {
    carouselIndex = (carouselIndex + 1) % groups.length; // Loop back to the first group after the last
    track.style.transition = "transform 0.5s ease"; // Add smooth transition for sliding
    track.style.transform = `translateX(-${carouselIndex * groupWidth}px)`; // Move carousel to the next image
  }

  // Slide every 3 seconds
  setInterval(slideCarousel, 3000);

  // Restart the carousel loop from the first image after the last image
  track.addEventListener("transitionend", () => {
    if (carouselIndex === groups.length - 1) {
      setTimeout(() => {
        track.style.transition = "none"; // Disable transition while resetting position
        track.style.transform = "translateX(0)"; // Reset to the first image
        carouselIndex = 0; // Reset the index to the first image
      }, 2000); // Wait for the sliding to complete before resetting
    }
  });

  // animation for looping through the words.
  const wanderlust = document.getElementById("wanderlust");
  const alphabets = wanderlust.children;
  let letterIndex = 0;
  const animateText = () => {
    for (letter of alphabets) {
      letter.classList.remove("animate-scaleY");
    }
    alphabets[letterIndex].classList.add("animate-scaleY");
    letterIndex = (letterIndex + 1) % alphabets.length;
    setTimeout(animateText, 1000);
  };

  // Initial setup
  if (window.innerWidth > 768) {
    animateText();
  }

  updateButtons();
  setInterval(autoSlide, 5000);
});
