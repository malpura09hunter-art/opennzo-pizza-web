(() => {
  const PASSWORD = 'ovesh';
  const gate = document.getElementById('opennzo-lock');
  if (!gate) return;

  const form = document.getElementById('opennzo-lock-form');
  const input = document.getElementById('opennzo-password');
  const message = document.getElementById('opennzo-lock-message');
  const button = document.getElementById('opennzo-open-button');
  if (!form || !input || !message || !button) return;

  if (sessionStorage.getItem('opennzo_open') === 'yes') {
    gate.remove();
    return;
  }

  input.disabled = false;
  input.readOnly = false;
  button.disabled = false;

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

    window.setTimeout(() => {
      gate.classList.add('shop-opened');
      window.setTimeout(() => gate.remove(), 1000);
    }, 800);
  });

  /* The visual transition is CSS-driven. This only lets the existing
     introduction link finish its fade before loading the homepage. */
  const intro = document.getElementById('opennzo-intro');
  const introButton = document.getElementById('intro-skip');
  if (introButton && intro) {
    introButton.addEventListener('click', (event) => {
      if (introButton.tagName.toLowerCase() !== 'a') return;
      event.preventDefault();
      intro.classList.add('intro-exit');
      window.setTimeout(() => {
        window.location.href = introButton.getAttribute('href') || 'index.html';
      }, 650);
    });
  }
})();
