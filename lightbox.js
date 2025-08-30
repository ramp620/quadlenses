// assets/lightbox.js

;(function() {
  const backdrop = document.querySelector('.lightbox-backdrop');
  const imgEl   = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  function open(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || '';
    backdrop.classList.add('show');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    backdrop.classList.remove('show');
    backdrop.setAttribute('aria-hidden', 'true');
    imgEl.src = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const t = e.target;
    if (t.matches('[data-lightbox]')) {
      open(t.src, t.alt);
    }
    if (t === backdrop || t === closeBtn) {
      close();
    }
  });

  document.addEventListener('keydown', e => {
    if (backdrop.classList.contains('show') && e.key === 'Escape') {
      close();
    }
  });
})();
