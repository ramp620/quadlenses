// app.js — QUADLENSES UI behavior (mobile nav + header hide)
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      setOpen(open);
    });

    // Close when a nav link is clicked (mobile)
    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      if (nav.classList.contains('is-open')) setOpen(false);
    });

    // Close on Escape / click outside
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (e.target.closest('.site-nav') || e.target.closest('.nav-toggle')) return;
      setOpen(false);
    });
  }

  // Hide header on scroll down, show on scroll up (desktop-ish)
  if (header) {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      const farEnough = Math.abs(y - lastY) > 10;

      if (farEnough && window.matchMedia('(min-width: 821px)').matches) {
        header.style.transform = goingDown && y > 80 ? 'translateY(-100%)' : 'translateY(0)';
        header.style.transition = 'transform .18s ease';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastY = y;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }
})();
