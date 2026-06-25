/* ==========================================================
   WELLO — SHARED SCRIPT
   Handles: nav toggle, scroll-reveal, accordions, size picker,
            order form, buy FAQ
   ========================================================== */

(function () {
  'use strict';

  /* ----- Lucide ----- */
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  renderIcons();

  /* ----- Footer year ----- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ----- Nav: mobile toggle ----- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const open = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    // close on link click
    navMobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMobile.classList.remove('open'));
    });
    // close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMobile.contains(e.target)) {
        navMobile.classList.remove('open');
      }
    });
  }

  /* ----- Nav: mark active link ----- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----- Scroll-reveal ----- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.anim-on-scroll').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.anim-on-scroll').forEach(el => el.classList.add('visible'));
  }

  /* ----- Size picker (buy page) ----- */
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.size-guide').querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const sizeInput = document.getElementById('band-size');
      if (sizeInput) sizeInput.value = btn.dataset.size;
    });
  });

  /* ----- Buy FAQ accordion ----- */
  document.querySelectorAll('.buy-faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.buy-faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ----- Order form submission ----- */
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = orderForm.querySelector('.pay-btn');
      const sizeVal = document.getElementById('band-size') && document.getElementById('band-size').value;
      if (!sizeVal) {
        alert('Please select a band size before proceeding.');
        return;
      }
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Redirecting to payment…';
      }
      // Replace the URL below with your Razorpay / Stripe payment link
      const PAYMENT_LINK = '#payment-not-configured';
      setTimeout(() => { window.location.href = PAYMENT_LINK; }, 800);
    });
  }

})();
