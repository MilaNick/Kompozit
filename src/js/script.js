window.addEventListener('DOMContentLoaded', function () {
//------------------drop-down menu--------------------
  const itemsDropdown = document.querySelectorAll('.item--dropdown');
  itemsDropdown.forEach(item => {
    item.addEventListener('mouseenter', event => {
      const dropdown = event.target.querySelector('.dropdown-wrap');
      dropdown.classList.remove('hide');
      dropdown.style.animation = 'rotate 1000ms';
    })
    item.addEventListener('mouseleave', event => {
      const dropdown = event.target.querySelector('.dropdown-wrap');
      dropdown.classList.add('hide');
    })
  })

//-------------------top-slider---------------------------
  const prev = document.querySelector('.arrow__prev');
  const next = document.querySelector('.arrow__next');
  const topSlider = document.querySelector('.first-screen__slider');

  const slider = (slider) => {
    const images = slider.querySelectorAll('.slider__item');
    const dots = slider.querySelectorAll('.slider__pagination-btn');
    let currentIndex = 0;
    const showSlideByIndex = (targetIndex) => {
      images[currentIndex].classList.remove('active');
      images[currentIndex].classList.add('hide');
      images[targetIndex].classList.add('active');
      images[targetIndex].style.animation = 'rotate 2500ms';
      const ACTIVE_CLASSNAME_DOT = 'slider__pagination-btn--active';
      dots[currentIndex].classList.remove(ACTIVE_CLASSNAME_DOT);
      dots[targetIndex].classList.add(ACTIVE_CLASSNAME_DOT);
      currentIndex = targetIndex;
    }
    const getChangeSlide = (dir) => () => {
      let targetIndex;
      if (dir === 'next') {
        targetIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      } else {
        targetIndex = (currentIndex <= 0 ? images.length : currentIndex) - 1;
      }
      showSlideByIndex(targetIndex);
    }
    dots.forEach((dot) => {
      dot.addEventListener('click', ({target}) => {
        const targetIndex = [...dots].indexOf(target);
        showSlideByIndex(targetIndex);
      })
    })
    const prevSlide = getChangeSlide('prev');
    const nextSlide = getChangeSlide('next');
    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);
    slider.addEventListener('mouseleave', () => {
      const id = setInterval(nextSlide, 5000);
      slider.addEventListener('mouseenter', () => {
        clearInterval(id);
      })
    })
  }
  slider(topSlider);

//--------------slider-bottom-----------------
  let position = 0;
  const slidesToShow = 6;
  const slidesToScroll = 1;
  const container = document.querySelector('.customers .customers__slider')
  const track = document.querySelector('.customers .bottom-slider')
  const btnPrev = document.querySelector('.customers .customers__arrow .arrow__prev')
  const btnNext = document.querySelector('.customers .customers__arrow .arrow__next')
  const items = document.querySelectorAll('.customers .bottom-slider__item')
  const itemsCount = items.length;
  const itemWidth = container.clientWidth / slidesToShow;
  const movePosition = slidesToScroll * itemWidth;

  items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
  });

  btnNext.addEventListener('click', () => {
    const itemLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
    setPosition();
    checkBtns();
  })
  btnPrev.addEventListener('click', () => {
    const itemRight = Math.abs(position) / itemWidth;
    position += itemRight >= slidesToScroll ? movePosition : itemRight * itemWidth;
    setPosition();
    checkBtns();
  })
  const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
  }
  const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
  }
  checkBtns();


})
