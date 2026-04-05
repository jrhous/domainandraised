/* ============================================
   Domain & Raised — Script (Editorial Redesign)
   ============================================ */

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---- MOBILE MENU ----
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const parent = el.parentElement;
        const siblings = parent.querySelectorAll('[data-reveal]');
        const index = Array.from(siblings).indexOf(el);

        el.style.setProperty('--stagger', index);

        requestAnimationFrame(() => {
          el.classList.add('revealed');
        });

        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Section headers
  const headers = document.querySelectorAll('.section-header');

  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        headerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -40px 0px'
  });

  headers.forEach(el => headerObserver.observe(el));
}

// ---- TERMINAL TYPING ----
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
          }, i * 180);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(terminalBody);
}

// ---- HERO ENTRANCE ----
function animateHero() {
  const elements = [
    document.querySelector('.hero-tag'),
    document.querySelector('#hero h1'),
    document.querySelector('.hero-kicker'),
    document.querySelector('.hero-sub'),
    document.querySelector('.hero-ctas'),
    document.querySelector('.hero-stats')
  ].filter(Boolean);

  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ${0.1 + i * 0.08}s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s ${0.1 + i * 0.08}s cubic-bezier(0.4, 0, 0.2, 1)`;
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
}

// ---- CONTACT FORM (Formspree) ----
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        btn.textContent = 'Sent!';
        btn.style.opacity = '1';
        btn.style.background = '#2D8A4E';

        const msg = document.createElement('div');
        msg.style.cssText = `
          text-align: center; padding: 20px; margin-top: 16px;
          background: rgba(45, 138, 78, 0.08); border: 1px solid rgba(45, 138, 78, 0.2);
          border-radius: 8px; color: #2D8A4E; font-weight: 500; font-size: 0.95rem;
        `;
        msg.textContent = "Got it! We'll get back to you within 24 hours.";
        form.appendChild(msg);

        setTimeout(() => {
          form.reset();
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.style.opacity = '';
          btn.disabled = false;
          msg.remove();
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      btn.textContent = 'Error \u2014 try again';
      btn.style.background = '#D4421E';
      btn.style.color = '#fff';
      btn.style.opacity = '1';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.opacity = '';
        btn.disabled = false;
      }, 3000);
    });
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  animateHero();
  initScrollReveal();
  animateTerminal();
});
