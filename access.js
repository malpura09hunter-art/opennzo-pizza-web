(() => {
  const PASSWORD = 'ovesh';

  /* Keep the project introduction team details synchronized with the
     actual OPENNZO team list. This runs before the password gate logic. */
  const introTeam = document.querySelector('.intro-team');
  if (introTeam) {
    introTeam.innerHTML = `
      <span><b>Om Dulam</b> · 201</span>
      <span><b>Omkar Shirke</b> · 202</span>
      <span><b>Ovesh Malpura</b> · 203</span>
      <span><b>Parth Shinde</b> · 204</span>
      <span><b>Pawan Sonkar</b> · 205</span>
    `;
  }

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

  /* CSS performs the visual animation. This small navigation handler only
     waits for the existing CSS fade, then opens the homepage. */
  const intro = document.getElementById('opennzo-intro');
  const introButton = document.getElementById('intro-skip');
  if (introButton && intro) {
    introButton.addEventListener('click', (event) => {
      event.preventDefault();
      intro.classList.add('intro-exit');
      window.setTimeout(() => {
        window.location.href = 'index.html';
      }, 650);
    });
  }
})();
