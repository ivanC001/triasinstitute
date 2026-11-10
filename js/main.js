/**
 * TRIAS INSTITUTE - Main Script
 * Navbar, Scroll Spy, Reveal on Scroll, Animated Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy();
  initRevealOnScroll();
  initCounters();
});

/* ==========================================================================
   NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-actions a, .mobile-drawer-actions button');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileBtn) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.toggle('mobile-nav-active');
      const isOpened = document.body.classList.contains('mobile-nav-active');
      mobileBtn.innerHTML = isOpened
        ? '<i data-lucide="x" style="width: 24px; height: 24px;"></i>'
        : '<i data-lucide="menu" style="width: 24px; height: 24px;"></i>';
      if (window.lucide) lucide.createIcons();
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('mobile-nav-active');
      if (mobileBtn) {
        mobileBtn.innerHTML = '<i data-lucide="menu" style="width: 24px; height: 24px;"></i>';
        if (window.lucide) lucide.createIcons();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('mobile-nav-active')) {
      const navContainer = document.querySelector('.nav-container');
      if (navContainer && !navContainer.contains(e.target)) {
        document.body.classList.remove('mobile-nav-active');
        if (mobileBtn) {
          mobileBtn.innerHTML = '<i data-lucide="menu" style="width: 24px; height: 24px;"></i>';
          if (window.lucide) lucide.createIcons();
        }
      }
    }
  });
}

/* ==========================================================================
   SCROLL SPY
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('aria-current') === 'page') return;
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   REVEAL ON SCROLL
   ========================================================================== */
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   ANIMATED STAT COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.innerHTML = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.innerHTML = `${prefix}${Math.floor(current)}${suffix}`;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => counterObserver.observe(c));
}
