// assets/lightbox.js

;(function() {
  const backdrop   = document.querySelector('.lightbox-backdrop');
  const imgEl      = document.querySelector('.lightbox-img');
  const closeBtn   = document.querySelector('.lightbox-close');
  let   lastFocus  = null;

  function open(src, alt) {
    // Save last focused element to restore focus on close
    lastFocus = document.activeElement;

    // Use currentSrc when responsive images are in play
    imgEl.src  = src;
    imgEl.alt  = alt || '';

    backdrop.classList.add('show');
    backdrop.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-modal', 'true');

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Move focus into the lightbox
    closeBtn.focus();
  }

  function close() {
    backdrop.classList.remove('show');
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.removeAttribute('aria-modal');

    imgEl.src = '';
    document.body.style.overflow = '';

    // Return focus to the element that triggered the lightbox
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', e => {
    const t = e.target;

    // Open lightbox when any [data-lightbox] image is tapped
    if (t.matches('[data-lightbox]')) {
      const src = t.currentSrc || t.src;
      open(src, t.alt);
    }

    // Close when backdrop or close button is tapped
    if (t === backdrop || t === closeBtn) {
      close();
    }
  });

  document.addEventListener('keydown', e => {
    // Escape closes the lightbox
    if (backdrop.classList.contains('show') && e.key === 'Escape') {
      close();
    }
  });

  // Prevent touch-move on the backdrop to stop background scroll
  backdrop.addEventListener('touchmove', e => {
    if (backdrop.classList.contains('show')) {
      e.preventDefault();
    }
  }, { passive: false });
})();
