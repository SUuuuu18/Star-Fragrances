const track = document.querySelector('.hero-slider .slides');
const slides = Array.from(track.children);
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let index = 0;

function updateSlider() {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');

  // Center active slide
  const offset = -index * (slides[0].offsetWidth + 40) + track.offsetWidth / 2 - slides[0].offsetWidth / 2;
  track.style.transform = `translateX(${offset}px)`;
}

// Automatic slide every 3 seconds
let autoSlide = setInterval(() => {
  index++;
  if(index >= slides.length) index = 0;
  updateSlider();
}, 3000);

// Arrow navigation
leftArrow.addEventListener('click', () => {
  index--;
  if(index < 0) index = slides.length - 1;
  updateSlider();
  resetInterval();
});

rightArrow.addEventListener('click', () => {
  index++;
  if(index >= slides.length) index = 0;
  updateSlider();
  resetInterval();
});

// Reset auto slide on manual click
function resetInterval() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    index++;
    if(index >= slides.length) index = 0;
    updateSlider();
  }, 3000);
}

// Initial display
updateSlider();
