// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav: fullscreen overlay controlled by body.menu-open
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
const bodyEl = document.body;
function setMenu(open){
  if (!burger || !navLinks) return;
  if (open){
    bodyEl.classList.add('menu-open');
    burger.setAttribute('aria-expanded','true');
  } else {
    bodyEl.classList.remove('menu-open');
    burger.setAttribute('aria-expanded','false');
  }
}
if (burger && navLinks){
  burger.addEventListener('click', ()=> setMenu(!bodyEl.classList.contains('menu-open')));
  navLinks.addEventListener('click', (e)=>{
    const t = e.target;
    if (t && t.tagName === 'A') setMenu(false);
  });
  window.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', ()=>{ if (window.innerWidth > 1024) setMenu(false); });
}

// Lazy load-friendly: defer animations until GSAP loads
window.addEventListener('DOMContentLoaded', () => {
  const runAnimations = () => {
    if (!window.gsap) return;
    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // Hero subtle float/parallax on image
    gsap.to('.hero__image img', { scale: 1.05, duration: 8, ease: 'none', repeat: -1, yoyo: true });

    // Reveal up
    document.querySelectorAll('.reveal-up').forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
      });
    });

    // Reveal side
    document.querySelectorAll('.reveal-side').forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0, x: 24 }, {
        autoAlpha: 1, x: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
      });
    });

    // Staggered modules/testimonials
    document.querySelectorAll('.reveal-stagger').forEach((wrap) => {
      const items = wrap.children;
      gsap.fromTo(items, { autoAlpha: 0, y: 18 }, {
        autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: wrap, start: 'top 80%' }
      });
    });

    // Parallax background for audience section
    const parallax = document.querySelector('.audience .parallax-bg');
    if (parallax && window.ScrollTrigger) {
      gsap.to(parallax, {
        yPercent: -18, ease: 'none',
        scrollTrigger: {
          trigger: '.audience',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    }

    // CTA glow pulse
    gsap.fromTo('.cta__box', { boxShadow: '0 0 0 rgba(212,175,55,0)' }, {
      duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
      boxShadow: '0 0 26px rgba(212,175,55,.25)'
    });
  };

  // Wait a frame to ensure external scripts are parsed
  requestAnimationFrame(runAnimations);
});

// Progressive enhance: Defer non-critical images if not already lazy
document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
  img.decoding = 'async';
});
