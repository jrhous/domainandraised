/* ============================================
   Domain & Raised — Script
   ============================================ */

// ---- NAV SCROLL EFFECT ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- MOBILE MENU ----
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger
  menuToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

// ---- SCROLL ANIMATIONS ----
function animateOnScroll() {
  const elements = document.querySelectorAll(
    '.pain-card, .service-card, .portfolio-card, .price-card, .step, .fade-in'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = parent.querySelectorAll(entry.target.tagName + '.' + entry.target.classList[0]);
        const index = Array.from(siblings).indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ---- TERMINAL TYPING ANIMATION ----
function animateTerminal() {
  const terminalBody = document.querySelector('.terminal-body');
  if (!terminalBody) return;

  const lines = terminalBody.querySelectorAll('p');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
          }, i * 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(terminalBody);
}

// Smooth scroll handled by CSS scroll-behavior + scroll-padding-top
// No JS override needed — CSS accounts for the fixed nav height

// ---- CONTACT FORM (Formspree) ----
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        btn.textContent = 'Sent!';
        btn.style.background = '#00e87b';
        btn.style.color = '#07080a';

        const msg = document.createElement('div');
        msg.style.cssText = `
          text-align: center; padding: 24px; margin-top: 16px;
          background: rgba(0, 232, 123, 0.1); border: 1px solid rgba(0, 232, 123, 0.3);
          border-radius: 8px; color: #00e87b; font-weight: 500;
        `;
        msg.innerHTML = "Got it! We'll get back to you within 24 hours.";
        form.appendChild(msg);

        setTimeout(() => {
          form.reset();
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
          msg.remove();
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      btn.textContent = 'Error — try again';
      btn.style.background = '#ff4d4d';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    });
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  animateTerminal();
});
