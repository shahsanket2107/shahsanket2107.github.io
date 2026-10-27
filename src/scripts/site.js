/**
 * All the JavaScript on this site. Everything here is additive: without it,
 * every panel, note and source is simply shown, and every route is a link.
 *
 *   [data-toggle]   disclosure buttons (the [1] source, the console node)
 *   [data-console]  tabs for the little console, arrow keys included
 *   [data-filters]  lane filter chips on the work section
 *   [data-deck]     the kill note stack
 *   [data-count]    hero stats count up once, only if motion is welcome
 *   [data-reveal]   gentle reveal on scroll, only if motion is welcome
 */
import { initCaseBack } from './case-back.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const moving = matchMedia('(prefers-reduced-motion: no-preference)').matches;

/* Types a panel's command, then lets its output fade in. */
const typeOut = (panel) => {
  const cmd = $('.cmd', panel);
  if (!moving || !cmd) return;
  const full = cmd.dataset.full || (cmd.dataset.full = cmd.textContent);
  clearInterval(panel._t);
  panel.classList.add('is-typing');
  let n = 0;
  cmd.textContent = '';
  panel._t = setInterval(() => {
    cmd.textContent = full.slice(0, ++n);
    if (n >= full.length) {
      clearInterval(panel._t);
      setTimeout(() => panel.classList.remove('is-typing'), 160);
    }
  }, Math.max(14, 520 / full.length));
};

/* Disclosures */
for (const b of $$('[data-toggle]')) {
  const target = document.getElementById(b.dataset.toggle);
  if (!target) continue;
  b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    target.classList.toggle('is-open', open);
  });
}

/* Console tabs */
const consoleEl = $('[data-console]');
if (consoleEl) {
  const list = $('[data-tabs]', consoleEl);
  const tabs = $$('[role="tab"]', consoleEl);
  list.hidden = false;
  const select = (tab, focus) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.classList.toggle('is-on', on);
      if (on) typeOut(panel);
    }
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t, false));
    t.addEventListener('keydown', (e) => {
      const n = tabs.length;
      const k = { ArrowRight: i + 1, ArrowLeft: i - 1 + n, Home: 0, End: n - 1 }[e.key];
      if (k === undefined) return;
      e.preventDefault();
      select(tabs[k % n], true);
    });
  });

  /* Type the first command once the console scrolls into view. */
  if (moving && 'IntersectionObserver' in window) {
    const seen = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      seen.disconnect();
      typeOut($('.panel.is-on', consoleEl));
    }, { threshold: 0.5 });
    seen.observe(consoleEl);
  }
}

/* Hero stats count up. The real number is in the HTML already. */
if (moving) {
  for (const el of $$('[data-count]')) {
    const to = +el.dataset.count;
    const t0 = performance.now() + 340;
    const tick = (t) => {
      const k = Math.min(1, Math.max(0, (t - t0) / 900));
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

/* Lane filters */
const filters = $('[data-filters]');
if (filters) {
  filters.hidden = false;
  const chips = $$('[data-lane-pick]', filters);
  const lanes = $$('[data-lane]');
  for (const c of chips) {
    c.addEventListener('click', () => {
      const pick = c.dataset.lanePick;
      for (const x of chips) x.setAttribute('aria-pressed', String(x === c));
      for (const l of lanes) l.hidden = pick !== 'all' && l.dataset.lane !== pick;
    });
  }
}

/* Kill note deck */
const deck = $('[data-deck]');
if (deck) {
  const notes = $$('.note', deck);
  const status = $('[data-deck-status]', deck);
  let at = 0;
  const show = (i) => {
    at = (i + notes.length) % notes.length;
    notes.forEach((n, k) => {
      n.classList.toggle('is-on', k === at);
      n.classList.toggle('dealt', k === at);
      n.setAttribute('aria-hidden', String(k !== at));
    });
    status.textContent = `Kill note ${at + 1} of ${notes.length}: ${$('.note__title', notes[at]).textContent}`;
  };
  notes.forEach((n, k) => n.setAttribute('aria-hidden', String(k !== 0)));
  $('[data-deck-next]', deck).addEventListener('click', () => show(at + 1));
  $('[data-deck-prev]', deck).addEventListener('click', () => show(at - 1));
}

/* Case pages: swipe, Escape and arrow keys */
if ($('[data-case]')) initCaseBack();

/* Reveal */
if (moving && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (es) => {
      for (const e of es) {
        if (!e.isIntersecting) continue;
        e.target.dataset.in = '';
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  for (const el of $$('[data-reveal]')) {
    // Only arm what's off screen, so nothing visible is ever hidden.
    if (el.getBoundingClientRect().top > innerHeight) el.dataset.armed = '';
    io.observe(el);
  }
  setTimeout(() => {
    for (const el of $$('[data-armed]:not([data-in])')) delete el.dataset.armed;
  }, 4000);
}
