const addButtons = (block) => {
  // icons
  const iconPrev = document.createElement('img');
  iconPrev.src = '../../icons/chevron-left.svg';
  const iconNext = document.createElement('img');
  iconNext.src = '../../icons/chevron-right.svg';

  // prev button
  const prevButton = document.createElement('span');
  prevButton.append(iconPrev);
  prevButton.dataset.carouselButton = 'prev';
  prevButton.classList.add('carousel-control');
  prevButton.classList.add('carousel-control-prev');

  // next button
  const nextButton = document.createElement('span');
  nextButton.append(iconNext);
  nextButton.dataset.carouselButton = 'next';
  nextButton.classList.add('carousel-control');
  nextButton.classList.add('carousel-control-next');

  // add buttons
  block.prepend(prevButton);
  block.append(nextButton);
};

export default function decorate(block) {
  const slides = [...block.children];

  slides[0].dataset.active = true;

  slides.forEach((e) => {
    e.classList.add('slide');
    e.dataset.type = 'slide';
  });

  addButtons(block);

  const buttons = document.querySelectorAll('[data-carousel-button]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
      const selectedCarousel = button
        .closest('.carousel');

      const activeSlide = selectedCarousel.querySelector('[data-active]');

      const validSlides = [...selectedCarousel.children];
      validSlides.pop();
      validSlides.shift();

      let newIndex = validSlides.indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = validSlides.children.length - 1;
      if (newIndex >= validSlides.length) newIndex = 0;
      validSlides[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });
}
