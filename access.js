(() => {
  const PASSWORD = 'ovesh';
  const gate = document.getElementById('opennzo-lock');
  if (!gate) return;

  /* Keep the OPENNZO introduction open until the visitor chooses to continue.
     The visitor can read it and click the button to enter the homepage immediately. */
  const nativeSetTimeout = window.setTimeout.bind(window);
  window.setTimeout = (callback, delay, ...args) => {
    if (delay === 65000) return 0;
    return nativeSetTimeout(callback, delay, ...args);
  };

  const form = document.getElementById('opennzo-lock-form');
  const input = document.getElementById('opennzo-password');
  const message = document.getElementById('opennzo-lock-message');
  const button = document.getElementById('opennzo-open-button');

  if (sessionStorage.getItem('opennzo_open') === 'yes') {
    gate.remove();
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    message.className = 'lock-message';

    if (input.value.trim().toLowerCase() !== PASSWORD) {
      message.textContent = 'Not this key. The oven is still waiting — try again.';
      message.classList.add('bad');
      input.value = '';
      input.focus();
      gate.classList.remove('lock-shake');
      void gate.offsetWidth;
      gate.classList.add('lock-shake');
      return;
    }

    sessionStorage.setItem('opennzo_open', 'yes');
    message.textContent = 'Opening shop...';
    message.classList.add('good');
    button.textContent = 'Opening...';
    button.disabled = true;
    input.disabled = true;
    gate.classList.add('shop-opening');

    nativeSetTimeout(() => {
      gate.classList.add('shop-opened');
      nativeSetTimeout(() => gate.remove(), 1000);
    }, 800);
  });

  /* Make the introduction control clearly enter the homepage rather than behave like a timer. */
  const guideObserver = new MutationObserver(() => {
    const intro = document.getElementById('opennzo-intro');
    if (!intro) return;
    const skip = document.getElementById('intro-skip');
    const hint = intro.querySelector('.intro-hint');
    if (skip) skip.textContent = 'Open homepage now ↗';
    if (hint) hint.textContent = 'Read the project introduction, then open the homepage when ready.';
  });
  guideObserver.observe(document.documentElement, { childList: true, subtree: true });
})();
