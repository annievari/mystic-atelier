/* ════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════ */

const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const navItems  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ════════════════════════════════════════
   SMOOTH SCROLL
════════════════════════════════════════ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.pageYOffset - 70;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ════════════════════════════════════════
   SCROLL-REVEAL (fade-in)
════════════════════════════════════════ */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), i * 80);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

/* ════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
════════════════════════════════════════ */

const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ════════════════════════════════════════
   HERO WORD ROTATION
════════════════════════════════════════ */

const rotateEl    = document.querySelector('.hero-rotate-word');
const rotateWords = ['marcas', 'historias', 'identidades', 'experiencias'];
let wordIndex     = 0;

if (rotateEl) {
  setInterval(() => {
    // Animate out
    rotateEl.style.opacity   = '0';
    rotateEl.style.transform = 'translateY(-16px)';

    setTimeout(() => {
      wordIndex = (wordIndex + 1) % rotateWords.length;
      rotateEl.textContent = rotateWords[wordIndex];

      // Snap to below, then animate in
      rotateEl.style.transition = 'none';
      rotateEl.style.transform  = 'translateY(16px)';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          rotateEl.style.transition = '';
          rotateEl.style.opacity    = '1';
          rotateEl.style.transform  = 'translateY(0)';
        });
      });
    }, 420);
  }, 2600);
}

/* ════════════════════════════════════════
   SERVICES CAROUSEL
════════════════════════════════════════ */

const slides    = document.querySelectorAll('.carousel-slide');
const prevBtn   = document.querySelector('.carousel-prev');
const nextBtn   = document.querySelector('.carousel-next');
const indicator = document.querySelector('.carousel-indicator');
let activeSlide = 0;

function goToSlide(index) {
  slides[activeSlide].classList.remove('active');
  activeSlide = (index + slides.length) % slides.length;
  slides[activeSlide].classList.add('active');
  if (indicator) {
    const n = slides.length;
    indicator.textContent = `0${activeSlide + 1} / 0${n}`;
  }
}

if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(activeSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(activeSlide + 1));
