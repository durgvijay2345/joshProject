document.querySelectorAll('.navbar-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    document.querySelectorAll('.navbar-menu a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
// Recommendations slider dots update logic
const slider = document.querySelector('.reco-slider-touch');
const cards = Array.from(document.querySelectorAll('.reco-card-touch'));
const dots = Array.from(document.querySelectorAll('.dot'));

function setCenterCardAndDots() {
  const sliderRect = slider.getBoundingClientRect();
  let minDist = Infinity, idx = 0;
  cards.forEach((card, i) => {
    const cardRect = card.getBoundingClientRect();
    const dist = Math.abs((cardRect.left + cardRect.width/2) - (sliderRect.left + sliderRect.width/2));
    if (dist < minDist) { minDist = dist; idx = i; }
    card.classList.remove('center');
  });
  cards[idx].classList.add('center');
  dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
}
function scrollToCenter(idx) {
  const targetCard = cards[idx];
  if (!targetCard) return;
  slider.scrollTo({
    left: targetCard.offsetLeft - slider.offsetWidth/2 + targetCard.offsetWidth/2,
    behavior: "smooth"
  });
}
slider.addEventListener('scroll', ()=>{ setTimeout(setCenterCardAndDots,70); });
dots.forEach((dot, i) => dot.addEventListener('click', () => scrollToCenter(i)));

window.addEventListener('load', ()=>{
  scrollToCenter(2); // start with center card
  setCenterCardAndDots();
});
window.addEventListener('resize', setCenterCardAndDots);