/**
 * All the JavaScript on this site.
 *
 * One IntersectionObserver that arms below-fold groups so the register can rule
 * itself in, plus swipe and keyboard navigation on the case pages. The header
 * hairline and the scroll progress bar are CSS. The theme is resolved before
 * first paint in the layout.
 *
 * Everything here is additive. If this file never loads, every page still works
 * and every route is still reachable by a link.
 */
import { initCaseBack } from './case-back.js';

/* Bundled on every page, armed only where the markup exists. A script tag in
 * the case route's own template is not picked up by the build. */
if (document.querySelector('.case__rail')) initCaseBack();

if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver(
    (es) => {
      for (const e of es) {
        if (!e.isIntersecting) continue;
        e.target.dataset.in = '';
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 }
  );
  for (const el of els) {
    // Only arm what is off screen. Nothing visible is ever hidden, so a dead
    // observer cannot blank the page.
    if (el.getBoundingClientRect().top > innerHeight) el.dataset.armed = '';
    io.observe(el);
  }
  // Failsafe.
  setTimeout(() => {
    for (const el of document.querySelectorAll('[data-armed]:not([data-in])')) delete el.dataset.armed;
  }, 4000);
}
