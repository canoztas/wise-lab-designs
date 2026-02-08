document.addEventListener('DOMContentLoaded', () => {

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navToggle.classList.toggle('active');
      siteNav.classList.toggle('active');
    });
  }

  // Dropdown menus
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link-dropdown');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!menu) return;

    // Desktop: hover
    dropdown.addEventListener('mouseenter', () => menu.classList.add('show'));
    dropdown.addEventListener('mouseleave', () => menu.classList.remove('show'));

    // Mobile: click
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        menu.classList.toggle('show');
      });
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 20,
          behavior: 'smooth'
        });
        // Close mobile nav if open
        if (siteNav) siteNav.classList.remove('active');
        if (navToggle) {
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Header scroll effect
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // Hero card auto-cycle (homepage)
  const heroCards = document.querySelectorAll('.hero-card');
  if (heroCards.length > 0) {
    let activeIndex = 0;
    heroCards[0].classList.add('active');

    setInterval(() => {
      heroCards[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % heroCards.length;
      heroCards[activeIndex].classList.add('active');
    }, 4000);
  }

});
