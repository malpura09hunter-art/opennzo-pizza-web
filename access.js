(() => {
  const PASSWORD = 'ovesh';
  const gate = document.getElementById('opennzo-lock');
  if (!gate) return;

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

    window.setTimeout(() => {
      gate.classList.add('shop-opened');
      window.setTimeout(() => gate.remove(), 1000);
    }, 800);
  });
})();
