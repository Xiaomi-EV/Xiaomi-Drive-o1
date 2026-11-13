(() => {
  const root = document.documentElement;
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeIcon = document.querySelector('[data-theme-icon]');
  const progress = document.querySelector('.reading-progress span');

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '\u2600' : '\u263E';
    if (themeToggle) themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    try { localStorage.setItem('drivefoundry-theme', theme); } catch (_) {}
  };

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('drivefoundry-theme'); } catch (_) {}
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const markCurrent = (id) => navLinks.forEach((link) => link.classList.toggle('is-current', link.getAttribute('href') === `#${id}`));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) markCurrent(visible[0].target.id);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .2, .6] });
    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = [...group.querySelectorAll('[data-tab]')];
    const panels = [...group.querySelectorAll('[data-panel]')];
    const replayBars = (panel) => {
      const chart = panel?.querySelector('.bar-chart');
      if (!chart) return;
      chart.classList.remove('bar-animate');
      // Force a layout pass so repeated tab clicks replay the fill animation.
      void chart.offsetWidth;
      window.requestAnimationFrame(() => chart.classList.add('bar-animate'));
    };
    const selectTab = (name, moveFocus = false) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.tab === name;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && moveFocus) tab.focus();
      });
      panels.forEach((panel) => {
        const active = panel.dataset.panel === name;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
        if (active && name === 'causal') replayBars(panel);
      });
    };
    tabs.forEach((tab, index) => {
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.addEventListener('click', () => selectTab(tab.dataset.tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        selectTab(tabs[next].dataset.tab, true);
      });
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (!track || !previous || !next) return;
    const step = () => {
      const card = track.querySelector('[data-carousel-card], .appendix-card, figure');
      return card ? card.getBoundingClientRect().width + 16 : track.clientWidth * .82;
    };
    const updateControls = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };
    previous.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
  });

  const dialog = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxCaption = document.querySelector('[data-lightbox-caption]');
  let lastTrigger = null;
  const closeLightbox = () => {
    if (dialog?.open) dialog.close();
    lastTrigger?.focus();
  };
  document.querySelectorAll('[data-zoom-trigger]').forEach((button) => {
    button.addEventListener('click', () => {
      const figure = button.closest('[data-zoom]');
      if (!figure || !dialog || !lightboxImage) return;
      lastTrigger = button;
      lightboxImage.src = figure.dataset.zoom;
      lightboxImage.alt = figure.querySelector('img')?.alt || '';
      if (lightboxCaption) lightboxCaption.textContent = figure.dataset.caption || '';
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
  });
  document.querySelector('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeLightbox(); });

  const citationButton = document.querySelector('[data-copy-citation]');
  const citation = `@misc{drivefoundry,
  title={DriveFoundry: Co-Evolving Data and Model for Efficient Closed-Loop Iteration in Autonomous Driving},
  author={Xiaomi EV team},
  year={2026},
  eprint={2611.11532},
  archivePrefix={arXiv},
  url={https://arxiv.org/abs/2611.11532},
}`;
  citationButton?.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(citation);
      if (status) status.textContent = 'Copied';
    } catch (_) {
      if (status) status.textContent = 'Copy unavailable';
    }
    window.setTimeout(() => { if (status) status.textContent = ''; }, 2400);
  });
})();
