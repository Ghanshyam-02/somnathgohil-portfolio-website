// =============================================
//  Portfolio — Somnath R. Gohil
//  Interactions: Navbar scroll, hamburger menu,
//  IntersectionObserver fade-ins
// =============================================

// --- Navbar scroll shadow ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.25)';
  }
}, { passive: true });

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on nav link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--gold)'
          : '';
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' });

sections.forEach(s => sectionObserver.observe(s));

// --- Fade-in on scroll ---
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling cards
      const siblings = entry.target.parentElement
        ? [...entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)')]
        : [];
      const delay = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(delay * 80, 400));
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// --- Smooth scroll offset for sticky navbar ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
