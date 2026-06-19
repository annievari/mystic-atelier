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
   CONTACT FORM
   TODO: añade action="https://formspree.io/f/YOUR_ID" al <form>
         para recibir los mensajes por correo.
════════════════════════════════════════ */

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formNote    = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;

    // Simulación de envío — reemplazar con fetch a Formspree cuando esté listo
    setTimeout(() => {
      submitBtn.textContent = 'Mensaje Enviado ✓';
      submitBtn.style.background = '#2d6e3a';
      formNote.style.display = 'block';
      formNote.textContent = '¡Gracias! Te contactaré pronto.';
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = 'Enviar Mensaje';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        formNote.style.display = 'none';
      }, 4000);
    }, 1200);
  });
}
