(() => {
  const card = document.querySelector('.page-orders .form-card');
  if (!card) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const children = Array.from(card.children);

  children.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(i * 60, 300) + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    children.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  children.forEach((el) => io.observe(el));
})();
