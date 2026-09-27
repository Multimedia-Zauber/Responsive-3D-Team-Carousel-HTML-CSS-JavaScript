const cards = [...document.querySelectorAll('.card')];
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsWrap = document.querySelector('.dots');
const memberName = document.getElementById('memberName');
const memberRole = document.getElementById('memberRole');

let current = 2;
let touchStartX = 0;

cards.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('aria-label', `Teammitglied ${index + 1}`);
  dot.addEventListener('click', () => {
    current = index;
    updateCarousel();
  });
  dotsWrap.appendChild(dot);
});

const dots = [...document.querySelectorAll('.dot')];

function circularDistance(index, currentIndex, total) {
  let diff = index - currentIndex;

  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  return diff;
}

function updateCarousel() {
  cards.forEach((card, index) => {
    card.className = 'card';

    const diff = circularDistance(index, current, cards.length);

    if (diff === 0) card.classList.add('active');
    else if (diff === -1) card.classList.add('left-1');
    else if (diff === 1) card.classList.add('right-1');
    else if (diff === -2) card.classList.add('left-2');
    else if (diff === 2) card.classList.add('right-2');
    else card.classList.add('hidden');
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === current);
  });

  const activeCard = cards[current];
  memberName.textContent = activeCard.dataset.name;
  memberRole.textContent = activeCard.dataset.role;
}

function nextSlide() {
  current = (current + 1) % cards.length;
  updateCarousel();
}

function prevSlide() {
  current = (current - 1 + cards.length) % cards.length;
  updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].clientX;
  const delta = touchEndX - touchStartX;

  if (Math.abs(delta) > 45) {
    delta < 0 ? nextSlide() : prevSlide();
  }
}, { passive: true });

updateCarousel();
