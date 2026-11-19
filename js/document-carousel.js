document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('document-carousel');
  const previous = document.getElementById('document-carousel-prev');
  const next = document.getElementById('document-carousel-next');
  const count = document.getElementById('document-carousel-count');
  if (!track || !previous || !next || !count) return;

  const cards = [...track.querySelectorAll('.document-card')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function firstVisibleIndex() {
    const left = track.getBoundingClientRect().left;
    return cards.reduce((best, card, index) =>
      Math.abs(card.getBoundingClientRect().left - left) <
      Math.abs(cards[best].getBoundingClientRect().left - left) ? index : best, 0);
  }

  function visibleCount() {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return Math.max(1, Math.round((track.clientWidth + gap) / (cards[0].getBoundingClientRect().width + gap)));
  }

  function update() {
    const first = firstVisibleIndex();
    const visible = visibleCount();
    previous.disabled = first === 0;
    next.disabled = first >= cards.length - visible;
    count.textContent = `${first + 1}–${Math.min(first + visible, cards.length)} de ${cards.length}`;
  }

  function move(direction) {
    const target = Math.max(0, Math.min(firstVisibleIndex() + direction, cards.length - visibleCount()));
    track.scrollTo({ left: track.scrollLeft + cards[target].getBoundingClientRect().left - track.getBoundingClientRect().left, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});
