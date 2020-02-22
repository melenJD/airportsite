let slideIndex = 0;
let timeint = null;
init();

function init() {
  showSlides(slideIndex)
  nextSlide()
  timeint = setInterval(nextSlide, 5000)
}

function nextSlide() {
  showSlides(slideIndex += 1)
}

function plusSlides(n) {
  showSlides(slideIndex += n);
  clearInterval(timeint)
  timeint = setInterval(nextSlide, 5000)
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  clearInterval(timeint)
  timeint = setInterval(nextSlide, 5000)
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('image-slide')
  const dots = document.getElementsByClassName('dot')
  if(n > slides.length){slideIndex = 1}
  if(n < 1){slideIndex = slides.length}
  for(i=0; i < slides.length; i++) {
    slides[i].classList.remove('show')
  }
  for(i=0; i < dots.length; i++){
    dots[i].classList.remove('active')
  }
  slides[slideIndex-1].classList.add('show')
  dots[slideIndex-1].classList.add('active')
}