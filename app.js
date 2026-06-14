/* app.js — BezRyzyka Landing Page interactions */

'use strict';

// ── Dynamic year ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Sticky nav scroll class ──────────────────────────────
  const nav = document.querySelector('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Intersection Observer — fade-in on scroll ────────────
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => observer.observe(el));

  // ── Smooth scroll for anchor links ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Staggered feature card entrance ─────────────────────
  const cards = document.querySelectorAll('.feature-card');
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach(card => {
    card.classList.add('fade-in');
    cardObserver.observe(card);
  });

  // ── CTA button ripple effect ─────────────────────────────
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(255,255,255,0.12);
        transform: scale(0);
        animation: ripple-expand 0.5s ease-out forwards;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-expand {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});
