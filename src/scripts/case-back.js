/**
 * Case page navigation without chrome.
 *
 *   two finger swipe   back to the register (trackpad, either direction)
 *   touch swipe right  back to the register (phone and tablet)
 *   Escape             back to the register
 *   left / right       previous and next project
 *
 * A trackpad swipe is a wheel event with horizontal delta, not a touch event.
 * They need separate handlers or the trackpad gesture silently does nothing.
 *
 * If the reader arrived from the index we use history.back(), which restores
 * their scroll position in the register. Only if they landed here cold do we
 * navigate to /#work, which lands at the top of the section instead.
 */

export function initCaseBack() {
  const REGISTER = '/#work';
  const TRIGGER = 170; // px of horizontal travel before it commits

  let cameFromIndex = false;
  try {
    cameFromIndex =
      !!document.referrer && new URL(document.referrer).origin === location.origin
        ? new URL(document.referrer).pathname === '/'
        : false;
  } catch (e) {}

  function toRegister() {
    if (cameFromIndex && history.length > 1) history.back();
    else location.href = REGISTER;
  }

  /* ── Trackpad, two fingers ────────────────────────────────────
     Either direction, because the platform maps left to forward and
     there is never anything forward of a case page. The tab fills as
     the gesture travels, so it is visible before it commits and can
     be abandoned halfway. */
  const tab = document.querySelector('.swipeback');
  let ax = 0;
  let ay = 0;
  let seen = 0;
  let done = false;
  let idle;

  function progress(p) {
    if (tab) tab.style.setProperty('--p', p);
  }

  function reset() {
    ax = 0;
    ay = 0;
    progress(0);
  }

  addEventListener(
    'wheel',
    (e) => {
      if (done || e.shiftKey || e.ctrlKey) return;
      const now = Date.now();
      if (now - seen > 220) reset(); // a pause ends the gesture
      seen = now;

      ax += e.deltaX;
      ay += e.deltaY;
      // Vertical scrolling wanders sideways a little. Ignore it.
      if (Math.abs(ax) < Math.abs(ay) * 1.6) {
        progress(0);
        return;
      }

      const p = Math.min(Math.abs(ax) / TRIGGER, 1);
      progress(p);
      clearTimeout(idle);
      idle = setTimeout(reset, 240);

      if (p >= 1) {
        done = true;
        clearTimeout(idle);
        toRegister();
      }
    },
    { passive: true }
  );

  /* ── Touch swipe ──────────────────────────────────────────────
     Rightward, mostly horizontal, and quick. A slow or steep drag is
     the reader scrolling and must not be stolen. */
  let x0 = null;
  let y0 = null;
  let t0 = 0;

  addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length !== 1) {
        x0 = null;
        return;
      }
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
      t0 = Date.now();
    },
    { passive: true }
  );

  addEventListener(
    'touchend',
    (e) => {
      if (x0 === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - x0;
      const dy = t.clientY - y0;
      const dt = Date.now() - t0;
      x0 = null;
      if (dt > 700) return;
      if (dx < 80) return;
      if (Math.abs(dy) > Math.abs(dx) * 0.7) return;
      toRegister();
    },
    { passive: true }
  );

  /* ── Keyboard ─────────────────────────────────────────────────
     Never while the reader is typing, and never over a modifier
     chord, which belongs to the browser. */
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;

    if (e.key === 'Escape') {
      toRegister();
      return;
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const links = document.querySelectorAll('.case-nav .row__name a');
      const target = links[e.key === 'ArrowLeft' ? 0 : 1];
      if (target) {
        e.preventDefault();
        location.href = target.getAttribute('href');
      }
    }
  });
}
