# Redesign: sanketshah.dev

**Author:** external design lead
**Date:** 2026-08-17
**Status:** spec, ready to build
**Scope:** complete visual and structural redesign of the home page and the case study route. No new content required. No new imagery required.

---

# PART 1 — CRITIQUE

I read every line of `global.css`, `index.astro`, `BaseLayout.astro`, `motion.js`, `profile.ts`, the content schema, all ten project files and all five company files. Here is what is actually wrong, with the values.

## 1.1 The overall impression

The page is eleven bordered, 16px-rounded, drop-shadowed rectangles stacked on a warm beige field, separated by 288px of nothing, with four different soft radial blobs behind them. It is not ugly. It is *forgettable*, which is worse. It reads as a 2021 SaaS marketing template that someone carefully warmed up with a beige palette. Nothing on the page could only be this person's site.

The content, by contrast, is genuinely unusual. `"Reached demo. Deprioritised before it went live."` `"Internal tool. No evaluation harness, so no accuracy claim."` `"Running internally. Not a public track record."` `"It did not. Better fitting on historical data reliably produced worse results on data the model had never seen."` Almost nobody writes that on a portfolio. That candour is the whole differentiator and the current design **hides it in 0.86rem `--text-3` at the bottom of a card**, which is the exact typographic slot everyone else uses for "Read more". The design is actively suppressing the best asset.

## 1.2 The grid rhythm — the worst offence

```css
.bento { grid-template-columns: repeat(6, 1fr); }
.bento > * { grid-column: span 3; }
.bento > .is-wide { grid-column: span 6; }
```

Three projects carry `featured: true` (`document-intelligence`, `systematic-futures`, `workspace-gateway`) and the sort puts Time Dynamics first, so the actual rendered sequence at ≥56rem is:

```
6 | 6 | 6 | 3 3 | 3 3 | 3 3 | 3 ·
```

Three full-width slabs, then three pairs, then **a single orphaned half-width card with dead space beside it**. It is worse than he described. And the rule is unlearnable: `featured` is an authoring flag with no on-page explanation, so a visitor sees size variance and assumes importance, but cannot tell what makes Workspace Gateway more important than Energy Trading Platform (which is `live: true`, is the core of the company's business, and is *not* featured). The hierarchy actively lies.

**Verdict: delete the bento entirely.** Not tune it. Delete it.

## 1.3 The card — confirmed structural defect

```css
.card { padding: clamp(1.5rem, 2.8vw, 2.1rem); }        /* up to 34px all round */
.card__n { position: absolute; top: 0.9rem; right: 1.1rem; font-size: 2.6rem; }
.card__co { display: flex; justify-content: space-between; }  /* date at top right */
```

The numeral is out of flow at 14.4px from the top and 17.6px from the right, occupying roughly a 42×42px box. The date is in flow inside 34px of padding, so its right edge lands at 34px from the card edge and its baseline at roughly y=48px. **They occupy the same rectangle.** This is not a tuning error you fix with `right: 2rem`. It is a structural error: one element is positioned and one is in flow, so no amount of nudging survives a longer date string like `2024 to 2025`. The fix is to stop positioning it.

Then:

- **`padding: 34px` for 28 words.** The card carries company, date, name, tagline, four chips, a status line and a hover-only CTA. That is a table row's worth of information wearing a poster's worth of padding.
- **`.card__go { opacity: 0 }`** permanently reserves ~30px of grid space to display nothing until hover. On a card that is *itself* a link, a hover-revealed "Read the case →" is a second call to action for an affordance the user already has.
- **`-webkit-text-stroke: 1px var(--line)`** on the numeral. Vendor-prefixed, invisible in Windows High Contrast, and renders differently between Safari and Chrome at 2.6rem. It is a decoration technique standing in for a design idea.
- **`.card::before`** is a 22rem cursor-follow radial spotlight at 20% gold. On a page with eleven cards this fires eleven pointermove listeners writing two custom properties per frame, to produce an effect most people will not consciously register.

## 1.4 Information density

Rough vertical budget of the current home page at 1440px:

| Region | Approx height |
|---|---|
| Hero | 780px |
| Ticker | 48px |
| Work (3 slabs + 7 cards) | ~2,400px |
| Skills (6 cards, 58 pills) | ~900px |
| Experience (5 timeline rows) | ~900px |
| Education (2 blob cards) | ~440px |
| Contact card | ~420px |
| Section padding, 5 × 288px | ~1,440px |

About **7,300px**, of which roughly 1,400px is deliberate emptiness and another large slice is card padding. The information on that page would fit comfortably in 3,200px. A hiring manager with sixty seconds gets through maybe 2,000px of it.

The single biggest offender is `.skill__list li` — 58 rounded mono pills at `0.28em 0.66em` padding. Pills are the number-one cause of "bulky". Fifty-eight of them is a wall of lozenges that nobody reads and that carries the same information as three lines of running text.

Second offender: **Work and Experience enumerate the same five companies twice.** Two sections, one fact set.

## 1.5 The type scale is not a scale

Eight independently-authored `clamp()` calls with no shared ratio:

| Selector | clamp | Rendered @1440 |
|---|---|---|
| `.hero h1` | `clamp(2.9rem, 8vw, 5.6rem)` | 89.6px |
| `.head__idx` | `clamp(3rem, 7vw, 5.5rem)` | 88px |
| `.contact-card h2` | `clamp(2.2rem, 6vw, 4.2rem)` | 67.2px |
| `.head__title` | `clamp(2.3rem, 5.4vw, 4rem)` | 64px |
| `.edu-card__grade` | `clamp(2rem, 4.4vw, 3rem)` | 48px |
| `.is-wide .card__title` | `clamp(1.5rem, 2.8vw, 2.1rem)` | 33.6px |
| `.tl__co` | `clamp(1.3rem, 2.6vw, 1.85rem)` | 29.6px |
| `.card__title` | `1.4rem` (fixed) | 22.4px |

Nothing agrees with anything. `.head__idx` at 88px is nearly the same size as the h1 at 89.6px, which means the decorative section numeral competes with the page's most important element. And `.card__title` is the only fixed size on the page, so at 390px it is the same 22.4px as at 1440px while everything around it shrinks.

**And the default body colour is the secondary colour:**

```css
body { color: var(--text-2); }   /* #6b6560 */
```

Nothing on the page is set in the primary ink unless explicitly overridden. That single line is why the whole page looks slightly washed out and low-conviction.

## 1.6 The colour system

Four accents for a page that needs one:

```css
--gold:     #c4a07c;   /* 2.3:1 on --bg. unusable as text. */
--gold-ink: #8a6234;   /* invented because --gold failed contrast */
--lilac:    #b8a9c6;   /* used exactly twice: portrait ring, glow-b */
--sage:     #8fb5a3;   /* used exactly once: the live dot */
```

A palette that needs a patch colour (`--gold-ink`) to be legible is a palette that was never designed. Lilac and sage each earn one appearance and neither means anything. And there are hardcoded hexes inside a themed system: `::selection { color: #1a1816 }`, `.btn--primary { color: #241f18 }`, `.hdr-resume:hover { color: #241f18 }`.

Then four separate soft-blob treatments doing identical work:

1. `.glow::before` — two radials, `blur(28px)`, `opacity: 0.55`, 70vh tall
2. `.portrait::before` — conic gradient, `blur(16px)`, `opacity: 0.35`
3. `.edu-card::after` — 16rem radial, `opacity: 0.14`
4. `.contact-card::before` — radial, `opacity: 0.16`

This is the tea-stain aesthetic. It is why the site reads "warm template" rather than "designed". Also, in `.hero.glow` both `.hero__canvas` and `.glow::before` sit at `z-index: -1` inside the same `isolation: isolate` context, so DOM order wins and the glow paints *over* the constellation, muddying it.

## 1.7 Spacing

There is no spacing scale. There are two tokens (`--gap`, `--section`) and then ~40 hand-written rem values: `0.8rem`, `0.35rem`, `1.05rem`, `1.6rem`, `2.25rem`, `0.15rem`, `2.75rem`, `1.075rem`. `--section: clamp(4.5rem, 10vw, 9rem)` on `padding-block` means **288px of vertical air between every pair of sections**. Air is not rhythm. Rhythm is repeated intervals, and these are arbitrary.

`--r: 16px` on every card plus `calc(var(--r) + 6px)` = 22px on the contact card. Two large radii on a page made of rectangles. Nothing says "2021 template" faster.

`--shadow-2: 0 2px 6px …, 0 26px 56px -20px rgb(45 42 38 / 0.28)` — a 56px blur under a card containing four lines of text, combined with `translateY(-6px)` on hover. Eleven floating cards per screen.

## 1.8 Motion

- `.card, .btn { transition: transform 450ms }`. **450ms is far too slow for a hover.** By the time the card finishes lifting the pointer is two cards away. Hover feedback belongs in 100–200ms.
- Reveal: `animation: rise 700ms` with `animation-delay: calc(var(--i) * 80ms)`, and `--i` is set to `i % 4`. The stagger therefore **resets to zero every four cards**, so mid-grid a card that is lower on screen animates before the one above it. Visible, and wrong.
- The constellation is 108 lines and roughly 2.5KB of the 4KB budget, running an O(n²) neighbour pass over up to 130 nodes on every frame. That is up to 8,385 `Math.hypot` calls and 8,385 potential `beginPath`/`stroke` pairs per frame, at 60fps, forever. It is also a stock effect present on thousands of portfolios. It costs real main-thread time *and* it signals "template" to the exact audience he is trying to impress.
- Magnetic buttons move the target away from the cursor. That is a hit-target regression sold as delight.
- Three different rotation values in the header: `rotate(-18deg)`, `rotate(-8deg)`, and `rotate(-6deg)` on the card numeral. Rotation is being used as a substitute for having an idea.

## 1.9 Chrome and correctness

- **Header:** wordmark + 4 nav links + 3 social icon buttons + resume pill + 2 icon toggles = **11 interactive elements in a 56px bar.** Nothing is emphasised, so nothing is found.
- **`backdrop-filter: blur(14px) saturate(1.4)`** promotes the header to its own compositing layer and forces a backdrop read on every scroll frame, to produce an effect that is essentially invisible over `#faf7f5`.
- **No `scroll-margin-top` anywhere.** Every anchor link (`/#work`, `/#skills`, …) scrolls the target heading underneath the sticky header. This is a live bug on every nav click.
- **Case study prev/next only walks siblings within the same company:**
  ```js
  const siblings = all.filter((x) => x.data.company.id === p.company.id);
  ```
  Pairbo, CarGurus, Oracle and WeLocal each have exactly one project, so **four of the ten case pages are dead ends with no prev and no next.** Live bug.
- **Inline styles in production markup:** `style="margin-top:1.1rem"`, `style="margin-top:1rem"`, and a footer div that carries both `class="wrap"` and `style="width:var(--w)"` — setting the same property twice, once redundantly. The engineer audience opens devtools. This is what they will find.
- **`gsap: ^3.12.7` sits in `dependencies` and is imported nowhere.** Anyone reading `package.json` sees a 23KB animation library that was installed and abandoned.
- The ticker payload is `profile.ts → ticker`, which is a verbatim subset of `profile.ts → skills`. The marquee is literally repeating the section 900px below it.
- `.head__idx` 01–04: `aria-hidden`, `-webkit-text-stroke`, 88px, zero information. A four-item sequence is not something a reader needs numbered.

## 1.10 What is worth keeping

Credit where it is due. These are good and are retained:

1. **`@layer reset, tokens, base, layout, components, motion;`** — an explicit cascade layer order. Rare and correct. Keep verbatim.
2. **`body { overflow-x: clip }` with the comment explaining why not `hidden`.** Correct, hard-won, keep the comment.
3. **The pre-paint inline theme resolve in `<head>`.** No FOUC, no layout shift. Keep, minus the motion branch.
4. **The motion philosophy:** *"The authored page is the finished state. Nothing is hidden unless script arms it."* Plus the `getBoundingClientRect().top > innerHeight` arming check and the 4-second failsafe that un-arms anything stuck. This is genuinely better than what most agencies ship. **Keep it exactly, port it to the new selectors.**
5. **`text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.** Keep.
6. **The `.skip` link.** Keep, restyle.
7. **The content schema**, especially `status: z.string()` with the instruction *"Plain words, good news and bad at the same weight."* This is the best decision in the repo. The redesign is built around promoting it.

## 1.11 What is deleted

Bento grid · all eleven cards · both border-radii · both shadow tokens · all four radial/conic blobs · `--lilac` · `--sage` · `--gold` · `--gold-ink` · `--glow-a` · `--glow-b` · Sora · the section index numerals · `-webkit-text-stroke` everywhere · the absolutely positioned card numeral · the hover-only `.card__go` · the canvas constellation · the cursor spotlight · magnetic buttons · the motion toggle · the header `backdrop-filter` · the header social icons · the standalone Experience section · 58 skill pills · `gsap` · every inline `style` attribute.

---

# PART 2 — THE CONCEPT

## **REGISTER**

The site becomes a register: a single, precisely ruled index of ten pieces of work, filed under five employers, set in a high-contrast editorial serif on warm paper, annotated in monospace, with one deep vermilion accent and nothing else. There are no cards. Depth comes from hairlines and from typographic weight, not from shadow, and — deliberately — not from flashing anything at the reader: hovering a row raises a 2px accent bar in the margin and shifts the ground by three percent, and no text on the page ever changes colour under the cursor. The argument is that a portfolio of ten items with 120 words each is not a gallery, it is a table of contents, and a table of contents set with real typographic discipline is the posh object here: it looks like the front matter of an expensively printed annual report, not like a landing page. What makes it *his* rather than a template is that the register's most prominent column is the one every other portfolio omits — the honest status of each thing, `"Reached demo. Deprioritised before it went live."` next to `"Shipped into a US carrier's network."` at the same weight — and that the page's one piece of imagery is not a photograph but a CSS-drawn Gantt of his actual employment dates with a vermilion notch for each of the ten projects, so the visual richness is generated from the data rather than decorated onto it. The quirk is deliberate and narrow: a vermilion that appears exactly six times per screen, an oversized serif that says his name at 104px, a vermilion duotone of the one photograph he has, and a single full-bleed ink block at the end of the page where the email address is the headline. Everything else is restraint, because restraint is the only thing that reads as expensive.

---

# PART 3 — THE SPEC

## 3.1 Tokens

Replace `@layer tokens` in full.

```css
@layer tokens {
  :root {
    /* ── Surface ───────────────────────────────────────────── */
    --bg:          #F4F3EF;   /* warm paper */
    --bg-raise:    #FBFAF7;   /* nothing floats; used for the mobile nav strip only */
    --bg-sunk:     #EBEAE4;   /* code blocks, chart ground */

    /* ── Ink ───────────────────────────────────────────────── */
    --ink:         #16150F;   /* primary. body text defaults here. 17.9:1 */
    --ink-2:       #47453C;   /* secondary prose, taglines.          8.1:1 */
    --ink-3:       #6B685F;   /* mono micro-labels, dates, numerals. 4.6:1 AA */
    --ink-4:       #96938A;   /* DECORATIVE ONLY. 2.7:1. Never text. */

    /* ── Rules ─────────────────────────────────────────────── */
    --rule:        #DDDBD3;   /* hairline between rows */
    --rule-strong: #C6C3B9;   /* underlines, chart ground */

    /* ── Accent. One colour, and it is READABLE. ───────────── */
    --accent:        #B23A1E;   /* deep vermilion. 5.38:1 on --bg. Legal as text. */
    --accent-on:     #F7F6F2;   /* text sitting ON an accent fill. 5.97:1 */
    --accent-bright: #F0764E;   /* CONSTANT both themes. The only accent
                                   permitted on an ink ground. 6.7:1 on --ink */

    /* ── Row hover surface. A 3% shift, not an inversion. ──── */
    --row-hover:   #EBEAE4;

    --focus:       #16150F;

    /* ── Type ──────────────────────────────────────────────── */
    --f-display: "Instrument Serif", "IS Fallback", Georgia, "Times New Roman", serif;
    --f-body:    "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
    --f-mono:    "Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

    --t-display: clamp(2.75rem,  1.357rem + 5.714vw, 6.5rem);   /*  44 → 104 */
    --t-h2:      clamp(2rem,     1.35rem  + 2.667vw, 3.75rem);  /*  32 →  60 */
    --t-h3:      clamp(1.375rem, 1.143rem + 0.952vw, 2rem);     /*  22 →  32 */
    --t-name:    clamp(1.25rem,  1.064rem + 0.762vw, 1.75rem);  /*  20 →  28 */
    --t-lead:    clamp(1.0625rem,0.993rem + 0.286vw, 1.25rem);  /*  17 →  20 */
    --t-body:    1.0625rem;    /* 17 */
    --t-sm:      0.9375rem;    /* 15 */
    --t-xs:      0.8125rem;    /* 13 */
    --t-mono:    0.75rem;      /* 12 */
    --t-mono-xs: 0.6875rem;    /* 11 */

    --lh-tight:  0.92;
    --lh-head:   1.06;
    --lh-name:   1.10;
    --lh-body:   1.60;
    --lh-prose:  1.72;

    --ls-display: -0.03em;
    --ls-head:    -0.02em;
    --ls-name:    -0.015em;
    --ls-body:     0em;
    --ls-mono:     0.06em;
    --ls-caps:     0.11em;

    /* ── Space. 4px base. ──────────────────────────────────── */
    --s-1:  0.25rem;   /*   4 */
    --s-2:  0.5rem;    /*   8 */
    --s-3:  0.75rem;   /*  12 */
    --s-4:  1rem;      /*  16 */
    --s-5:  1.5rem;    /*  24 */
    --s-6:  2rem;      /*  32 */
    --s-7:  3rem;      /*  48 */
    --s-8:  4rem;      /*  64 */
    --s-9:  6rem;      /*  96 */
    --s-10: 8rem;      /* 128 */

    --section-y: clamp(3.5rem, 2.6rem + 3.66vw, 5.5rem);  /* 56 → 88 */

    /* ── Layout ────────────────────────────────────────────── */
    --gutter:    clamp(1.25rem, 0.6rem + 2.667vw, 3rem);  /* 20 → 48 */
    --container: 78rem;      /* 1248 */
    --rail:      14rem;      /* 224. EVERYTHING aligns to this. */
    --measure:   66ch;
    --header-h:  3.5rem;     /* 56 */

    /* ── Radii. Effectively square. ────────────────────────── */
    --r-0: 0;
    --r-1: 2px;
    --r-2: 4px;

    /* ── Elevation. There is none. ─────────────────────────── */
    --shadow-0: none;
    --hairline:  0 1px 0 0 var(--rule);

    /* ── Easing ────────────────────────────────────────────── */
    --ease-out:  cubic-bezier(0.16, 1, 0.30, 1);      /* reveals */
    --ease-std:  cubic-bezier(0.40, 0, 0.20, 1);      /* colour, state */
    --ease-snap: cubic-bezier(0.22, 1.20, 0.36, 1);   /* the arrow only */

    /* ── Duration ──────────────────────────────────────────── */
    --d-1: 140ms;
    --d-2: 220ms;
    --d-3: 320ms;
    --d-4: 480ms;
    --d-5: 720ms;
  }

  /* Dark. Only what changes. --accent-bright does not. */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg:          #0F0F0D;
      --bg-raise:    #171714;
      --bg-sunk:     #0A0A08;
      --ink:         #F2F1EA;
      --ink-2:       #B8B6AC;   /*  9.5:1 */
      --ink-3:       #85837A;   /*  5.2:1 */
      --ink-4:       #5A5852;   /* decorative only */
      --rule:        #2A2A26;
      --rule-strong: #3D3C36;
      --accent:      #F0764E;   /* 6.66:1 on --bg */
      --accent-on:   #12110D;   /* 6.66:1 on --accent */
      --row-hover:   #1A1A16;
      --focus:       #F2F1EA;
    }
  }
  :root[data-theme="dark"] {
    --bg:          #0F0F0D;
    --bg-raise:    #171714;
    --bg-sunk:     #0A0A08;
    --ink:         #F2F1EA;
    --ink-2:       #B8B6AC;
    --ink-3:       #85837A;
    --ink-4:       #5A5852;
    --rule:        #2A2A26;
    --rule-strong: #3D3C36;
    --accent:      #F0764E;
    --accent-on:   #12110D;
    --row-hover:   #1A1A16;
    --focus:       #F2F1EA;
  }
}
```

### The three colour rules, non-negotiable

1. **`--accent` is always legal as text.** It is a *value pair*: dark vermilion `#B23A1E` on paper (5.38:1), light vermilion `#F0764E` on the dark ground (6.66:1). It never needs a patch colour to be readable, which is the failure the old `--gold` / `--gold-ink` pair was papering over. It also means the accent works as a small label, a link, a marker or a fill — one token, every job.
2. **`--accent-bright #F0764E` is constant in both themes** and is the *only* accent permitted on an ink ground (the contact band). That is the brand constant.
3. **Accent marks; it never narrates.** No paragraph, no sentence, no run of body copy is ever set in it. Maximum one or two words.
4. **`--ink-4` is never text.** It draws chart ground, hairline ticks and disabled arrows. If a human must read it, it is `--ink-3` or darker.

### Accent budget

Six appearances per viewport, maximum. Canonical allocation:

| # | Where |
|---|---|
| 1 | Header Resume button (fill) |
| 2 | Hero `<em>` underline, 3px |
| 3 | Section label leading square, 6px |
| 4 | Project ticks on the career chart, 2px |
| 5 | `live: true` status dot, 7px |
| 6 | Hovered row: 2px left marker, numeral, arrow |

The contact band is a seventh, but it is a full-bleed field at the page end and is alone in its viewport.

### Why vermilion, and two drop-in alternates

The first pass of this spec used an acid lime. It was wrong, for a reason worth writing down: a colour that bright can only ever be a *fill*, never type, so every use of it had to be engineered around its own illegibility — and the hover state had to invert the entire row to solid black just to give the accent somewhere legal to live. **When an accent forces the rest of the design to contort around it, the accent is wrong.** Deep vermilion on warm paper is bold without being loud, it is unmistakably not the default blue, it is legible everywhere at every size in both themes, and against `#F4F3EF` it reads as bound-book and printed-annual-report rather than as a highlighter. It is the colour of the concept.

Swapping it is two hex values. If he wants a different register:

| | Light `--accent` | Light contrast | Dark `--accent` | Dark contrast |
|---|---|---|---|---|
| **Vermilion (default)** | `#B23A1E` | 5.38:1 | `#F0764E` | 6.66:1 |
| Oxblood — quieter, more formal | `#8E2436` | 7.4:1 | `#E9808F` | 7.2:1 |
| Cobalt — cooler, more technical | `#1F3FD4` | 6.9:1 | `#8CA6FF` | 7.3:1 |

Nothing else in the spec changes. That is the point of routing every accent use through one token.

## 3.2 Type

### Change: drop Sora, add Instrument Serif

| Face | Cuts | Est. woff2, latin subset | Verdict |
|---|---|---|---|
| ~~Sora~~ | ~~600, 700~~ | ~~15.0 KB~~ | **Remove.** A geometric sans that reads as generic startup. It is the single largest contributor to "this could be anyone's site". |
| **Instrument Serif** | 400, 400 italic | **~22 KB** | **Add.** High-contrast display serif, SIL OFL. Instantly editorial and unmistakably not a template. The italic is a real expressive lever with zero extra design work. |
| Inter | 400, 500 | 20.6 KB | Keep. Best-in-class at 13–17px, already installed, already subset. |
| IBM Plex Mono | 400 | 4.3 KB | Keep. Correct engineer signal, and 4.3KB is free. |

**Total: ~47 KB**, down from 47.9 KB actual (Sora out, Instrument Serif in). Net cost of a complete identity change: roughly zero bytes. That is the justification.

**Hard rule: Instrument Serif never renders below 20px.** It is a display face; at 13px it is thin and muddy. Anything under 20px is Inter or Plex Mono. This one rule keeps the pairing clean.

### Fallback metrics (prevents the 104px FOUT jolt)

```css
@font-face {
  font-family: "IS Fallback";
  src: local("Georgia"), local("Times New Roman"), local("Times");
  size-adjust: 103%;
  ascent-override: 92%;
  descent-override: 24%;
  line-gap-override: 0%;
}
```

Preload `instrument-serif-400.woff2` and `inter-400.woff2` only. All faces `font-display: swap`.

### Scale, by role

| Role | Family | Weight | Size | Line height | Tracking | Colour |
|---|---|---|---|---|---|---|
| Hero name | Instrument Serif | 400 | `--t-display` 44→104 | 0.92 | -0.03em | `--ink` |
| Hero claim | Instrument Serif | 400 | `--t-h2` 32→60 | 1.06 | -0.02em | `--ink` |
| Hero claim `em` | Instrument Serif | 400 *italic* | inherit | inherit | -0.02em | `--ink` + accent underline |
| Section title (h2) | Instrument Serif | 400 | `--t-h2` 32→60 | 1.06 | -0.02em | `--ink` |
| Company (h3) | Instrument Serif | 400 | `--t-h3` 22→32 | 1.06 | -0.02em | `--ink` |
| Project name (h4) | Instrument Serif | 400 | `--t-name` 20→28 | 1.10 | -0.015em | `--ink` |
| Case h1 | Instrument Serif | 400 | `--t-h2` 32→60 | 1.06 | -0.02em | `--ink` |
| Case tagline | Instrument Serif | 400 *italic* | `--t-lead` 17→20 | 1.45 | 0 | `--ink-2` |
| Case lead ¶ | Inter | 400 | 1.25rem | 1.55 | -0.005em | `--ink` |
| Prose | Inter | 400 | 1.125rem | 1.72 | 0 | `--ink-2` |
| Body / dek | Inter | 400 | `--t-body` 17 | 1.60 | 0 | `--ink-2` |
| Tagline in row | Inter | 400 | `--t-sm` 15 | 1.45 | 0 | `--ink-2` |
| UI / links | Inter | 500 | `--t-xs` 13 | 1.40 | 0 | `--ink` |
| Data (dates, numerals) | Plex Mono | 400 | `--t-mono` 12 | 1.30 | 0.06em | `--ink-3` |
| Micro caps (labels) | Plex Mono | 400 | `--t-mono-xs` 11 | 1.20 | 0.11em, UPPERCASE | `--ink-2` |
| Status line | Plex Mono | 400 | 0.7188rem (11.5) | 1.40 | 0.02em | `--ink-3` |

```css
@layer base {
  body {
    font-family: var(--f-body);
    font-size: var(--t-body);
    line-height: var(--lh-body);
    color: var(--ink);              /* NOT --ink-2. This is the fix for "washed out". */
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    transition: background-color var(--d-2) var(--ease-std),
                color var(--d-2) var(--ease-std);
  }
  h1, h2, h3, h4 {
    font-family: var(--f-display);
    font-weight: 400;
    line-height: var(--lh-head);
    letter-spacing: var(--ls-head);
    color: var(--ink);
    text-wrap: balance;
  }
  p { text-wrap: pretty; }
  :where(.mono, time, .num) { font-variant-numeric: tabular-nums; }
  ::selection { background: var(--accent); color: var(--accent-on); }
}
```

## 3.3 Layout

### The rail thesis

**One 14rem rail. Everything on the page hangs off it.** Section labels sit in it. Company headers sit in it and stick. Case study back-links sit in it. Nothing else on the page introduces a new column origin. This is what makes an otherwise plain page read as designed rather than typed.

```css
@layer layout {
  .wrap {
    width: min(100% - (var(--gutter) * 2), var(--container));
    margin-inline: auto;
  }
  .section { padding-block: var(--section-y); }

  /* Every anchorable element clears the sticky header. Fixes the live bug. */
  :where([id]) { scroll-margin-top: calc(var(--header-h) + var(--s-5)); }

  /* The rail grid. Used by .sec-head, .reg-group and .case. */
  .railed {
    display: grid;
    grid-template-columns: var(--rail) minmax(0, 1fr);
    column-gap: var(--s-7);
  }
  @media (max-width: 63.999rem) {
    .railed { grid-template-columns: 1fr; row-gap: var(--s-4); }
  }

  .measure { max-width: var(--measure); }
  .bleed { width: 100vw; margin-inline: calc(50% - 50vw); }
  .vh { position:absolute; width:1px; height:1px; overflow:hidden;
        clip-path:inset(50%); white-space:nowrap; }
}
```

### Breakpoints

| Token | Value | Meaning |
|---|---|---|
| base | < 48rem (768) | one column, rail collapses |
| `md` | ≥ 48rem (768) | two-column register row, nav appears |
| `lg` | ≥ 64rem (1024) | rail engages, full five-column row, sticky company headers |
| `xl` | ≥ 90rem (1440) | container caps at 1248, gutters at 48 |

Author mobile-first with `min-width` queries. The current file mixes `max-width: 44rem / 46rem / 56rem / 58rem / 60rem / 34rem` — six arbitrary breakpoints, none shared. Replace with three.

### Behaviour at the four required widths

| | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| Container | 350 | 700 | 928 | 1248 |
| Gutter | 20 | 26 | 33 | 48 |
| Rail | collapsed | collapsed | 224 sticky | 224 sticky |
| Hero | 1 col, plate 152px above name | 1 col, plate 200px | 2 col, plate 260px | 2 col, plate 260px |
| Hero name | 44px | 54px | 72px | 104px |
| Register row | 2 cols, 4 stacked lines | 3 cols, 3 lines | 5 cols, 2 lines | 5 cols, 2 lines |
| Row arrow | hidden | hidden | shown | shown |
| Skills | 1 col | 1 col | 2 col | 2 col |
| Nav | scroll strip under header | inline centre | inline centre | inline centre |
| Chart | bars only, 3 year labels | bars, 4 labels | full | full |
| Case page | stacked, spec below | stacked, spec 2-col | body + sticky spec rail | body + sticky spec rail |

## 3.4 Components

---

### 3.4.1 Header

```html
<header class="site-header">
  <div class="wrap site-header__in">
    <a class="wordmark" href="/">Sanket Shah<i aria-hidden="true"></i></a>
    <nav class="nav" aria-label="Main">
      <a href="/#work">Work</a>
      <a href="/#toolkit">Toolkit</a>
      <a href="/#education">Education</a>
      <a href="/#contact">Contact</a>
    </nav>
    <div class="site-header__end">
      <button class="theme" type="button" data-theme-toggle
              aria-label="Switch to dark theme">
        <svg class="theme__i" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">…</svg>
      </button>
      <a class="resume" href="/Sanket_Resume.pdf">Resume</a>
    </div>
  </div>
</header>
<nav class="navstrip" aria-label="Sections"> … same 4 links … </nav>
```

```css
.site-header {
  position: sticky; top: 0; z-index: 50;
  height: var(--header-h);
  background: var(--bg);                        /* solid. no backdrop-filter. */
  border-bottom: 1px solid transparent;
}
.site-header__in {
  height: 100%;
  display: grid; grid-template-columns: auto 1fr auto; align-items: center;
}
.wordmark {
  font-family: var(--f-display); font-size: 1.125rem;
  letter-spacing: -0.01em; color: var(--ink);
}
.wordmark i {                                   /* the 6px accent full stop */
  display: inline-block; width: 6px; height: 6px;
  background: var(--accent); margin-left: 0.3em; vertical-align: 0.06em;
}
.nav { justify-self: center; display: flex; gap: var(--s-6); }
.nav a {
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-caps); text-transform: uppercase;
  color: var(--ink-2); position: relative; padding-block: 4px;
}
.nav a::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px;
  background: var(--ink); transform: scaleX(0); transform-origin: left;
}
.nav a:hover { color: var(--ink); }
.nav a[aria-current="true"] { color: var(--ink); }
.nav a[aria-current="true"]::after { transform: scaleX(1); background: var(--accent); height: 2px; }

.site-header__end { display: flex; align-items: center; gap: var(--s-3); }
.theme {
  width: 28px; height: 28px; display: grid; place-items: center;
  color: var(--ink-2); border-radius: var(--r-1);
}
.theme:hover { color: var(--ink); background: var(--bg-sunk); }
.resume {
  font-family: var(--f-body); font-weight: 500; font-size: var(--t-xs);
  background: var(--accent); color: var(--accent-on);
  padding: 6px 12px; border-radius: var(--r-1);
  --focus: var(--accent-on);
}
.resume:hover { filter: brightness(1.06); }

@media (max-width: 47.999rem) { .nav { display: none; } }
@media (min-width: 48rem)     { .navstrip { display: none; } }

/* Mobile section nav. A strip, not a hamburger. Zero JS, no focus trap. */
.navstrip {
  position: sticky; top: var(--header-h); z-index: 40;
  background: var(--bg-raise); border-bottom: 1px solid var(--rule);
  display: flex; gap: var(--s-5); overflow-x: auto;
  padding: 0 var(--gutter); height: 2.25rem; align-items: center;
  scrollbar-width: none; -webkit-overflow-scrolling: touch;
}
.navstrip::-webkit-scrollbar { display: none; }
.navstrip a {
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-caps); text-transform: uppercase;
  color: var(--ink-2); white-space: nowrap;
}
```

**Scroll progress bar — pure CSS, zero JS:**

```css
.site-header::after {
  content: ""; position: absolute; left: 0; bottom: -1px;
  height: 2px; width: 100%; background: var(--accent);
  transform: scaleX(0); transform-origin: left;
}
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .site-header::after {
      animation: progress linear both;
      animation-timeline: scroll(root block);
    }
    .site-header {
      animation: stick steps(1, end) both;
      animation-timeline: scroll(root block);
      animation-range: 0 48px;
    }
  }
}
@keyframes progress { to { transform: scaleX(1); } }
@keyframes stick    { to { border-bottom-color: var(--rule); } }
```

This removes the `header()` function from `motion.js` entirely. Browsers without scroll-driven animations get a header with no hairline and no progress bar; nothing breaks.

**Mobile (390):** wordmark + theme + Resume only, 56px tall, and the 36px `.navstrip` beneath it. No hamburger — four links and a single-scroll page do not justify 2KB of JS, an overlay, and a focus trap.

---

### 3.4.2 Hero

```html
<section class="hero">
  <div class="wrap">
    <p class="hero__strip">
      <span>Software engineer</span><span>Houston, Texas</span><span>2026</span>
    </p>
    <div class="hero__in">
      <div class="hero__col">
        <h1 class="hero__h1">
          <span class="hero__name" data-enter="1">Sanket Shah</span>
          <span class="hero__claim" data-enter="2">builds <em>AI systems</em>, trading
            platforms and the tooling around them.</span>
        </h1>
        <p class="hero__body" data-enter="3">Most of my work has been at an early stage
          startup, shipping across energy trading, maritime logistics, developer platforms
          and systematic research. I knew nothing about most of those domains on day one.
          Getting useful in them quickly is the part I have gotten good at.</p>
        <p class="hero__cta" data-enter="4">
          <a class="link" href="#work">See the work <span aria-hidden="true">↓</span></a>
          <a class="link" href="/Sanket_Resume.pdf">Download resume <span aria-hidden="true">↓</span></a>
        </p>
        <dl class="facts" data-enter="5">
          <div><dt>Projects</dt><dd>10</dd></div>
          <div><dt>Places</dt><dd>5</dd></div>
          <div><dt>Domains</dt><dd>5</dd></div>
        </dl>
      </div>
      <figure class="plate" data-enter="3">
        <picture>
          <source srcset="/images/profile-photo.webp" type="image/webp" />
          <img src="/images/profile-photo.jpg" alt="Sanket Shah"
               width="780" height="976" fetchpriority="high" decoding="async" />
        </picture>
      </figure>
    </div>
  </div>
</section>
```

```css
.hero { padding-block: clamp(2.5rem, 5vw, 4.5rem) clamp(2.5rem, 4vw, 3.5rem); }

/* The masthead rule. A hard ink line across the top of the page. */
.hero__strip {
  border-top: 1px solid var(--ink);
  padding-top: var(--s-3); margin-bottom: clamp(var(--s-6), 4vw, var(--s-8));
  display: flex; flex-wrap: wrap; gap: var(--s-5);
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--ink-2);
}
.hero__strip span + span { position: relative; padding-left: var(--s-5); }
.hero__strip span + span::before {
  content: ""; position: absolute; left: 0; top: 50%; width: 12px; height: 1px;
  background: var(--rule-strong);
}

.hero__in { display: grid; gap: var(--s-8); align-items: end; }
@media (min-width: 64rem) {
  .hero__in { grid-template-columns: minmax(0, 1fr) 16.25rem; }
}

.hero__h1 { display: grid; gap: var(--s-4); margin: 0; }
.hero__name {
  display: block; font-size: var(--t-display);
  line-height: var(--lh-tight); letter-spacing: var(--ls-display);
}
.hero__claim {
  display: block; font-size: var(--t-h2);
  line-height: var(--lh-head); letter-spacing: var(--ls-head);
  max-width: 20ch;
}
.hero__claim em {
  font-style: italic;
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 3px;
  text-underline-offset: 0.10em;
  text-decoration-skip-ink: none;
}
.hero__body {
  margin-top: var(--s-6); max-width: 52ch;
  font-size: var(--t-body); color: var(--ink-2);
}
.hero__cta { margin-top: var(--s-5); display: flex; flex-wrap: wrap; gap: var(--s-5); }

.link {
  font-weight: 500; font-size: var(--t-sm); color: var(--ink);
  border-bottom: 1px solid var(--rule-strong); padding-bottom: 2px;
}
.link:hover { border-bottom-color: var(--accent); border-bottom-width: 2px; padding-bottom: 1px; }

/* Fact strip */
.facts {
  margin-top: var(--s-7); display: grid;
  grid-template-columns: repeat(3, minmax(0, 8rem));
  border-top: 1px solid var(--rule);
}
.facts > div { padding: var(--s-4) var(--s-5) 0 0; }
.facts > div + div { border-left: 1px solid var(--rule); padding-left: var(--s-5); }
.facts dt {
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--ink-3);
}
.facts dd {
  font-family: var(--f-display); font-size: 2rem; line-height: 1;
  margin-top: var(--s-2); font-variant-numeric: tabular-nums;
}

/* Portrait as a duotone plate. No ring, no radius, no shadow.
   --plate is pinned to the light-theme vermilion in BOTH themes so the
   duotone reads the same whichever way the page is set. */
.plate {
  --plate: #B23A1E;
  position: relative; margin: 0; overflow: clip;
  width: 100%; aspect-ratio: 4 / 5; background: var(--plate);
  justify-self: end;
}
.plate img {
  width: 100%; height: 100%; object-fit: cover; object-position: 50% 14%;
  filter: grayscale(1) contrast(1.12) brightness(1.04);
  transition: filter var(--d-3) var(--ease-std);
}
.plate::after {
  content: ""; position: absolute; inset: 0;
  background: var(--plate); mix-blend-mode: multiply;
  transition: opacity var(--d-3) var(--ease-std);
}
.plate:hover img   { filter: grayscale(0) contrast(1); }
.plate:hover::after { opacity: 0; }

@media (max-width: 63.999rem) {
  .plate { width: 12.5rem; justify-self: start; order: -1; }   /* 200px, above the name */
}
@media (max-width: 47.999rem) {
  .plate { width: 9.5rem; }                                    /* 152px */
  .facts { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

**Why the h1 carries both name and claim:** one `h1` per page is required, the name must be in it for SEO and for a screen reader's first landmark, and a hiring manager needs the *what* in two seconds. Setting the name at 104px roman and the claim at 60px with one italic phrase underlined in vermilion resolves all three in one element. Accessible name: `"Sanket Shah builds AI systems, trading platforms and the tooling around them."` Correct sentence, correct hierarchy.

---

### 3.4.3 Section head

Every section opens identically. This repetition *is* the rhythm.

```html
<header class="sec-head railed">
  <p class="sec-head__label">Selected work</p>
  <div>
    <h2 class="sec-head__title" id="work-h">Ten things, five places</h2>
    <p class="sec-head__dek">Grouped by where I built them. Three are marked — those are the
      ones to read first. Every status line below is the honest one.</p>
  </div>
</header>
```

```css
.sec-head {
  border-top: 1px solid var(--ink);      /* hard rule, not a hairline */
  padding-top: var(--s-4);
  margin-bottom: var(--s-7);
}
.sec-head__label {
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--ink-2);
  display: flex; align-items: center; gap: var(--s-2);
  padding-top: 0.4em;
}
.sec-head__label::before {
  content: ""; width: 6px; height: 6px; background: var(--accent); flex: none;
}
.sec-head__title { font-size: var(--t-h2); max-width: 18ch; }
.sec-head__dek {
  margin-top: var(--s-3); max-width: 56ch;
  font-size: var(--t-body); color: var(--ink-2);
}
```

**Section index numerals 01–04: deleted.** Verdict on the brief's question 5 — gimmick, not signal. A four-item sequence is not something a reader needs numbered, they were `aria-hidden` so they told assistive tech nothing, they rendered at 88px in `-webkit-text-stroke` which is unsupported in high-contrast mode, and they competed with the section title for the same optical weight. The mono label with a 6px accent square does the same job in 1/20th the ink, and now the *only* numerals on the page are the ten project indices, which are real ordinals. Two numbering systems on one page is noise; one is a system.

---

### 3.4.4 The register (Work + Experience, merged)

**This is the centre of the redesign.**

#### The rhythm rule, stated

> **Projects are filed under the employer where they were built. Employers run newest first. Within an employer, projects run in the order they were started.**

That is it. A visitor perceives it in one scroll: **six under Time Dynamics, then one each under Pairbo, CarGurus, Oracle, WeLocal.** That shape *is* his career — one place where he did six different things, four places where he did one — and it needs no caption. No item is bigger than any other. There is no bento, no `is-wide`, no orphan.

`featured` is retained in the schema but demoted from a layout span to a **6px accent square before the name**, and the section dek states the rule in words: *"Three are marked — those are the ones to read first."* Rule stated, rule perceivable, rule costs six pixels.

This merge also deletes the standalone Experience section, because the company header carries role, location, dates and the one-line summary. Five companies were being enumerated twice; now they are enumerated once, with their work attached.

#### Structure

```html
<section class="section" id="work" aria-labelledby="work-h">
  <div class="wrap">
    <header class="sec-head railed"> … </header>

    <ol class="register">
      <li class="reg-group railed">
        <h3 class="grp">
          <span class="grp__co">Time Dynamics</span>
          <span class="grp__role">Software Engineer</span>
          <span class="grp__when"><time datetime="2024-10">2024</time> — Now · Houston, TX</span>
          <span class="grp__sum">Early stage startup in energy trading and maritime logistics.</span>
          <span class="grp__n">6 projects</span>
        </h3>

        <ol class="rows">
          <li>
            <article class="row" data-featured data-live>
              <span class="row__n"  aria-hidden="true">01</span>
              <h4 class="row__name"><a href="/work/document-intelligence">Maritime Document Intelligence</a></h4>
              <span class="row__co">Time Dynamics</span>
              <p    class="row__tag">Automated delay cost calculation from unstructured shipping documents.</p>
              <p    class="row__status">Reached demo. Deprioritised before it went live.</p>
              <span class="row__when"><time datetime="2024-10">2024</time>–<time datetime="2025-04">25</time></span>
              <span class="row__go" aria-hidden="true">→</span>
            </article>
          </li>
          …
        </ol>
      </li>
      …
    </ol>
  </div>
</section>
```

Heading order: `h1` (hero) → `h2` (section) → `h3` (company) → `h4` (project). Monotonic, and a screen-reader user gets a usable heading tree of the whole career.

#### Company header — sticky in the rail

```css
.reg-group { padding-top: var(--s-6); }
.grp {
  display: grid; gap: var(--s-1);
  align-self: start; margin: 0;
}
@media (min-width: 64rem) {
  .grp { position: sticky; top: calc(var(--header-h) + var(--s-6)); padding-top: var(--s-4); }
}
.grp__co   { font-family: var(--f-display); font-size: var(--t-h3);
             line-height: var(--lh-head); letter-spacing: var(--ls-head); }
.grp__role { font-family: var(--f-body); font-size: var(--t-xs); font-weight: 500;
             color: var(--ink-2); }
.grp__when { font-family: var(--f-mono); font-size: var(--t-mono-xs);
             letter-spacing: var(--ls-caps); text-transform: uppercase;
             color: var(--ink-3); margin-top: var(--s-2);
             font-variant-numeric: tabular-nums; }
.grp__sum  { font-family: var(--f-body); font-size: var(--t-xs); line-height: 1.5;
             color: var(--ink-3); margin-top: var(--s-3); max-width: 26ch; }
.grp__n    { font-family: var(--f-mono); font-size: var(--t-mono-xs);
             letter-spacing: var(--ls-caps); text-transform: uppercase;
             color: var(--ink-4); margin-top: var(--s-3); }

@media (max-width: 63.999rem) {
  .grp { border-top: 1px solid var(--ink); padding-top: var(--s-3); }
  .grp__sum { max-width: 48ch; }
}
```

**The sticky rail is the moment the concept lands.** Six Time Dynamics rows scroll past a pinned "Time Dynamics", then it releases and "Pairbo" takes its place for exactly one row. The reader learns the structure of his career without reading a word of explanation, and it costs zero JavaScript.

*Build gotcha: `position: sticky` dies silently if any ancestor has `overflow` other than `visible`. `.section` and `.wrap` must not set `overflow`. `body { overflow-x: clip }` is safe; `overflow-x: hidden` is not — which is a second reason the existing comment on that line is correct.*

#### The row

**The number/date collision, solved by construction.** The numeral is a **grid item in a dedicated 3rem track at the row's left edge**. The date is a **grid item in a dedicated 6.5rem track at the row's right edge**. Neither is positioned. They are separated by two content columns and 96px of gap. They cannot collide at any viewport, with any date string, ever. Delete `.card__n { position: absolute }` and never write `position: absolute` inside a row again.

```css
.rows { border-bottom: 1px solid var(--rule); }
.rows > li { position: relative; }

.row {
  position: relative;
  display: grid;
  grid-template-columns: 3rem minmax(0, 1.05fr) minmax(0, 1.35fr) 6.5rem 1.5rem;
  grid-template-areas:
    "num name tag  when go"
    "num co   stat when go";
  column-gap: var(--s-5);
  row-gap: var(--s-2);
  align-items: start;
  padding: var(--s-4);
  margin-inline: calc(var(--s-4) * -1);   /* hover ground + marker bleed 16px past the text */
  border-top: 1px solid var(--rule);
  color: var(--ink);
  transition: background-color var(--d-1) var(--ease-std),
              color            var(--d-1) var(--ease-std);
}

.row__n {
  grid-area: num; padding-top: 0.42em;
  font-family: var(--f-mono); font-size: var(--t-mono);
  letter-spacing: var(--ls-mono); color: var(--ink-3);
  font-variant-numeric: tabular-nums;
  transition: color var(--d-1) var(--ease-std);
}
.row__name {
  grid-area: name; margin: 0;
  font-family: var(--f-display); font-size: var(--t-name);
  line-height: var(--lh-name); letter-spacing: var(--ls-name);
  text-wrap: balance;
}
.row__name a { color: inherit; }
.row__name a::after { content: ""; position: absolute; inset: 0; }  /* full-row hit area */

.row[data-featured] .row__name a::before {
  content: ""; display: inline-block;
  width: 0.44em; height: 0.44em; background: var(--accent);
  margin-right: 0.42em; vertical-align: 0.12em;
}

.row__co {
  grid-area: co;
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--ink-3);
  transition: color var(--d-1) var(--ease-std);
}
.row__tag {
  grid-area: tag; margin: 0; padding-top: 0.15em;
  font-size: var(--t-sm); line-height: 1.45; color: var(--ink-2);
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
  overflow: hidden;                        /* bounds row height at 2 lines */
  transition: color var(--d-1) var(--ease-std);
}
.row__status {
  grid-area: stat; margin: 0;
  font-family: var(--f-mono); font-size: 0.7188rem; line-height: 1.4;
  letter-spacing: 0.02em; color: var(--ink-3);
  transition: color var(--d-1) var(--ease-std);
}
.row__status::before {                     /* one glyph, two states */
  content: ""; display: inline-block; flex: none;
  width: 7px; height: 7px; border-radius: 50%;
  border: 1px solid currentColor;
  margin-right: 0.65em; vertical-align: 0.02em;
}
.row[data-live] .row__status::before {
  background: var(--accent); border-color: var(--accent);
}
.row__when {
  grid-area: when; text-align: right; padding-top: 0.42em;
  font-family: var(--f-mono); font-size: var(--t-mono);
  letter-spacing: var(--ls-mono); color: var(--ink-3);
  font-variant-numeric: tabular-nums; white-space: nowrap;
  transition: color var(--d-1) var(--ease-std);
}
.row__go {
  grid-area: go; text-align: right; padding-top: 0.32em;
  font-size: 0.875rem; color: var(--ink-4);
  transition: transform var(--d-2) var(--ease-snap), color var(--d-1) var(--ease-std);
}
```

Row height at 1024–1440: 16 + max(28×1.1 + 8 + 11×1.2, 15×1.45×2 + 8 + 11.5×1.4) + 16 ≈ **96–112px**. Ten rows ≈ 1,040px including group headers, against ~2,400px today. **Density more than doubles and no information is lost — in fact the status line is promoted from tertiary to a primary column.**

#### Hover and focus — the marked row

**The governing rule: hover must not change the colour of any text a person is reading.** Only the ground shifts by one step, a marker appears, and the two decorative glyphs take the accent. Nothing restates itself, nothing flips, nothing strobes as the pointer sweeps down ten rows.

```css
/* The left marker. Sits in the 16px bleed, outside the text. */
.row::after {
  content: ""; position: absolute; left: 0; top: -1px; bottom: 0; width: 2px;
  background: var(--accent);
  transform: scaleY(0); transform-origin: top;
  transition: transform var(--d-2) var(--ease-out);
}

.row:hover,
.row:active,
.rows > li:has(a:focus-visible) .row {
  background: var(--row-hover);          /* a ~3% shift. Not an inversion. */
}
.row:hover::after,
.row:active::after,
.rows > li:has(a:focus-visible) .row::after {
  transform: scaleY(1);
}

/* Only the ordinal and the arrow change colour. Both are decorative. */
.row:hover .row__n,  .rows > li:has(a:focus-visible) .row__n,
.row:hover .row__go, .rows > li:has(a:focus-visible) .row__go {
  color: var(--accent);
}
.row:hover .row__go, .rows > li:has(a:focus-visible) .row__go {
  transform: translateX(6px);
}

/* The name picks up an accent underline. Text colour is unchanged. */
.row:hover .row__name a,
.rows > li:has(a:focus-visible) .row__name a {
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.14em;
  text-decoration-skip-ink: none;
}

/* Focus ring lands on the whole row, not on the 200px of link text. */
.rows > li:has(a:focus-visible) .row {
  outline: 2px solid var(--focus); outline-offset: -2px;
}
.row__name a:focus-visible { outline: none; }
@supports not selector(:has(*)) {
  .row__name a:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; }
}
```

**Why this and not a full-row inversion.** The first pass of this spec flipped the entire row to solid ink on hover. On paper it passed contrast, and in practice it was wrong: sweeping a pointer down ten rows made the page strobe black-white-black, the reader lost their place, and every line of text restated itself in a new colour at the exact moment they were trying to read it. Technically legible is not the same as readable. A hover state's only job is to say *this one*, and it should say it with the smallest gesture that is still unmistakable — here, a 2px accent bar in the bleed, a barely-there ground shift, and an underline under the name. **Nothing that carries meaning changes colour.**

Contrast is therefore unchanged by hover, which is the whole point. For completeness, on the hover ground: `--ink-2 #47453C` on `#EBEAE4` = **8.0:1**; `--ink-3 #6B685F` on `#EBEAE4` = **4.67:1**. Dark theme, `--ink-3 #85837A` on `#1A1A16` = **4.6:1**. All AA.

The bold, high-contrast inversion is not lost — it is **relocated to the contact band** (§3.4.9), where it happens once, at the end of the page, as a terminal statement rather than as a repeated hover state. One inversion on a page is an event. Ten of them under the cursor is a fault.

#### Responsive

```css
/* 768 – 1023: three columns, three lines */
@media (max-width: 63.999rem) {
  .row {
    grid-template-columns: 2.75rem minmax(0, 1fr) 7rem;
    grid-template-areas:
      "num name when"
      "num tag  tag"
      "num stat stat";
    row-gap: var(--s-2);
  }
  .row__co { display: none; }              /* the group header already says it */
  .row__go { display: none; }
  .row__tag { -webkit-line-clamp: 3; }
}

/* < 768: two columns, four lines */
@media (max-width: 47.999rem) {
  .row {
    grid-template-columns: 2.25rem minmax(0, 1fr);
    grid-template-areas:
      "num name"
      "num tag"
      "num when"
      "num stat";
    padding: var(--s-4) var(--s-2);
    margin-inline: calc(var(--s-2) * -1);
    column-gap: var(--s-3);
  }
  .row__when { text-align: left; padding-top: 0; }
  .row__name { font-size: 1.25rem; }
}
```

At <768 the arrow is dropped — the whole row is tappable and a chevron on a 350px row is noise. `.row:active` is already in the hover selector list, so a tap raises the marker and the ground shift for as long as the finger is down, which is the correct touch affordance and costs nothing extra.

---

### 3.4.5 The career chart

The page's only piece of "imagery", generated entirely from the content dates. This is the answer to "no budget for imagery": draw the data.

Placed between the ticker and the register, full container width, ~180px tall.

**Astro frontmatter:**

```ts
const T0 = 2020, T1 = 2027;                 // Jan 2020 → Dec 2026 inclusive
const COLS = (T1 - T0) * 12;                // 84
const m = (d: Date) => (d.getFullYear() - T0) * 12 + d.getMonth();
const now = new Date();
const bar = (s: Date, e: Date | null) => ({ a: m(s) + 1, b: m(e ?? now) + 2 });
```

**Markup** (one row per company, newest first, matching the register order):

```html
<figure class="chart" aria-hidden="true">
  <div class="chart__grid">
    <span class="chart__label">Time Dynamics</span>
    <span class="chart__track">
      <span class="chart__bar is-now" style="--a:58;--b:81"></span>
      <span class="chart__tick" style="--a:58"></span>  <!-- one per project -->
      …
    </span>
    …
  </div>
  <div class="chart__axis"><span>2020</span>…<span>2026</span></div>
</figure>
```

```css
.chart { margin: 0 0 var(--section-y); }
.chart__grid { display: grid; grid-template-columns: 9rem minmax(0, 1fr); row-gap: var(--s-2); }
.chart__label {
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--ink-3);
  align-self: center;
}
.chart__track {
  position: relative; display: grid; grid-template-columns: repeat(84, 1fr);
  height: 1.25rem; align-items: center;
  background: linear-gradient(var(--rule) 1px, transparent 1px) 0 50% / 100% 1px no-repeat;
}
.chart__bar {
  grid-column: var(--a) / var(--b);
  height: 8px; background: var(--ink-4); border-radius: var(--r-1);
  transform-origin: left;
}
.chart__bar.is-now { background: var(--ink); }
.chart__tick {
  grid-column: var(--a) / span 1; grid-row: 1;
  justify-self: start; width: 2px; height: 16px; background: var(--accent);
  z-index: 1;
}
.chart__axis {
  margin-top: var(--s-3); margin-left: 9rem;
  display: grid; grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid var(--rule); padding-top: var(--s-2);
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  color: var(--ink-4); font-variant-numeric: tabular-nums;
}
@media (max-width: 47.999rem) {
  .chart__grid { grid-template-columns: 6.5rem minmax(0, 1fr); }
  .chart__axis { margin-left: 6.5rem; }
  .chart__axis span:nth-child(even) { visibility: hidden; }
}
```

`aria-hidden="true"` is correct here: every date in the chart is stated in text in the register directly beneath it, so the chart is a redundant visual encoding and announcing 84 grid cells would be hostile.

---

### 3.4.6 Ticker

**Keep the component, replace the payload.** Currently it scrolls 24 technology names that are a verbatim subset of the Skills section 900px below — filler advertising filler. Replace `profile.ts → ticker` with **the ten project status strings**:

```ts
export const ticker = [
  'Shipped into a US carrier’s network.',
  'Reached demo. Deprioritised before it went live.',
  'Running internally. Not a public track record.',
  'Live. I am the one who gets the call when it breaks.',
  'Internal tool. No evaluation harness, so no accuracy claim.',
  'Shipped. Cut deployment support load by two weeks a month.',
  'Served 600+ customers. Then we stopped.',
  'Live since August 2025.',
  'Internal. Running live cycles.',
  'Shipped. Used daily.',
];
```

Same zero bytes of JS, same CSS marquee, and the most differentiating content he has now runs across the screen at eye level in the first viewport. Good news and bad news at the same weight, moving, above the fold. That is the personality of the site in one component.

```css
.ticker {
  border-block: 1px solid var(--rule);
  overflow: hidden; padding-block: var(--s-3);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.ticker__track { display: flex; width: max-content; }
.ticker__row { display: flex; align-items: center; gap: var(--s-7); padding-right: var(--s-7); }
.ticker__item {
  font-family: var(--f-mono); font-size: var(--t-mono); letter-spacing: var(--ls-mono);
  color: var(--ink-3); white-space: nowrap;
  display: inline-flex; align-items: center; gap: var(--s-7);
}
.ticker__item::after { content: ""; width: 5px; height: 5px; background: var(--accent); flex: none; }
@media (prefers-reduced-motion: no-preference) {
  .ticker__track { animation: slide 60s linear infinite; }
  .ticker:hover .ticker__track,
  .ticker:focus-within .ticker__track { animation-play-state: paused; }
}
@keyframes slide { to { transform: translateX(-50%); } }
```

Stays `aria-hidden="true"` — every string is in the register in reading order.

---

### 3.4.7 Toolkit (skills)

**Delete all 58 pills.** Six groups, each rendered as a heading, a one-line note, and the items as **running monospace text separated by middots**. Six groups × ~110px = ~330px, against ~900px today.

```html
<div class="toolkit">
  <section class="tool">
    <h3 class="tool__t">AI and agents</h3>
    <p class="tool__note">Built before the frameworks existed, so I know what they abstract.</p>
    <ul class="tool__list">
      <li>LLM integration</li><li>Multi agent systems</li>…
    </ul>
  </section>
  …
</div>
```

```css
.toolkit { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
           column-gap: var(--s-8); }
.tool { border-top: 1px solid var(--rule); padding-block: var(--s-5); }
.tool__t { font-family: var(--f-body); font-weight: 500; font-size: var(--t-body);
           letter-spacing: -0.005em; color: var(--ink); }
.tool__note { margin-top: var(--s-1); font-size: var(--t-sm); color: var(--ink-2);
              max-width: 46ch; }
.tool__list { margin-top: var(--s-3); font-family: var(--f-mono);
              font-size: var(--t-mono); line-height: 1.9; color: var(--ink-2); }
.tool__list li { display: inline; }
.tool__list li + li::before { content: " · "; color: var(--ink-4); }
@media (max-width: 63.999rem) { .toolkit { grid-template-columns: 1fr; } }
```

No hover state. It is a reference list; there is nothing to interact with, and inventing an interaction would be exactly the decoration this redesign is removing.

---

### 3.4.8 Education

Two register rows, same visual language, no cards, no radial blobs.

```css
.edu-row {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr) 10rem;
  column-gap: var(--s-6);
  border-top: 1px solid var(--rule);
  padding-block: var(--s-5);
}
.edu-row:last-child { border-bottom: 1px solid var(--rule); }
.edu__grade  { font-family: var(--f-display); font-size: 2rem; line-height: 1;
               font-variant-numeric: tabular-nums; color: var(--ink); }
.edu__school { font-family: var(--f-body); font-weight: 500; font-size: var(--t-body); }
.edu__sub    { font-size: var(--t-sm); color: var(--ink-2); }
.edu__deg    { font-size: var(--t-sm); color: var(--ink-2); margin-top: var(--s-2); }
.edu__courses{ margin-top: var(--s-3); font-family: var(--f-mono);
               font-size: var(--t-mono-xs); line-height: 1.8; color: var(--ink-3); }
.edu__courses li { display: inline; }
.edu__courses li + li::before { content: " · "; color: var(--ink-4); }
.edu__when   { text-align: right; font-family: var(--f-mono); font-size: var(--t-mono-xs);
               letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--ink-3);
               font-variant-numeric: tabular-nums; }
@media (max-width: 47.999rem) {
  .edu-row { grid-template-columns: 1fr; row-gap: var(--s-2); }
  .edu__grade { font-size: 1.5rem; }
  .edu__when { text-align: left; }
}
```

`4.0 / 4.0` at 32px in Instrument Serif is the one display treatment granted here. It is a genuine fact and it earns 32px. It does not earn 48px in gold with a radial blob behind it.

---

### 3.4.9 Contact — the ink band

Full-bleed ink. **The page's single inversion, and the last thing on it.** Near-black ground in the light theme, near-white in the dark theme, paper-coloured type at 17.9:1, and the email address set at 56px with an accent underline. This is where the boldness that used to be spread across ten hover states now lives — concentrated into one terminal block, where high contrast is dramatic instead of exhausting.

```html
<section class="band bleed" id="contact" aria-labelledby="contact-h">
  <div class="wrap">
    <p class="band__label">Get in touch</p>
    <h2 class="band__mail" id="contact-h">
      <a href="mailto:shahsanket2107@gmail.com">shahsanket2107@gmail.com</a>
    </h2>
    <p class="band__note">Houston, Texas. Happy to talk about any of the work above, or about
      what a system should do when the model gets it wrong.</p>
    <p class="band__links">
      <a href="/Sanket_Resume.pdf">Resume, PDF</a>
      <a href="https://github.com/shahsanket2107">GitHub</a>
      <a href="https://linkedin.com/in/sanketshah2107">LinkedIn</a>
    </p>
  </div>
</section>
```

```css
.band {
  background: var(--ink);
  color: var(--bg);                 /* paper on ink. 17.9:1 */
  padding-block: clamp(3.5rem, 7vw, 6rem);
  --focus: var(--accent-bright);    /* the ring must be visible on ink */
}
.band__label {
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-caps); text-transform: uppercase;
  color: var(--accent-bright);      /* #F0764E on ink = 6.7:1 */
}
.band__mail {
  margin-top: var(--s-4);
  font-family: var(--f-display);
  font-size: clamp(1.5rem, 0.72rem + 3.2vw, 3.5rem);   /* 24 → 56 */
  line-height: 1.05; letter-spacing: -0.02em;
  color: var(--bg);
  overflow-wrap: anywhere;
}
.band__mail a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--accent-bright);
  text-decoration-thickness: 3px;
  text-underline-offset: 0.12em;
  text-decoration-skip-ink: none;
  transition: text-decoration-thickness var(--d-1) var(--ease-std);
}
.band__mail a:hover { text-decoration-thickness: 6px; }

.band__note {
  margin-top: var(--s-5); max-width: 48ch; font-size: var(--t-body);
  color: color-mix(in srgb, var(--bg) 72%, var(--ink));   /* ~9:1 */
}
.band__links {
  margin-top: var(--s-6); display: flex; flex-wrap: wrap; gap: var(--s-6);
  font-family: var(--f-mono); font-size: var(--t-mono); letter-spacing: var(--ls-mono);
}
.band__links a {
  color: var(--bg);
  border-bottom: 1px solid color-mix(in srgb, var(--bg) 40%, transparent);
}
.band__links a:hover { border-bottom-color: var(--accent-bright); }
```

Setting the email address itself at 56px, as the heading, is the whole move: it is bold, it is useful, and it contains no marketing language whatsoever.

Contrast on the band: body copy `color-mix(--bg 72%, --ink)` on `--ink` ≈ **9:1**; the heading and links at **17.9:1**; the label and underline `#F0764E` on `#16150F` = **6.7:1**. Everything AA, most of it AAA.

*Note for the dark theme:* `background: var(--ink)` and `color: var(--bg)` invert automatically, so in dark mode the band becomes a near-white block on a near-black page. It is still the one inversion, still the terminal statement, and it still reads. `--accent-bright` is the one value that does not flip — on a near-white band it drops to 3.1:1, so under `:root[data-theme="dark"]` and the dark media query, override inside the band only: `.band { --accent-bright: #B23A1E; }`. One line, and the band's accent is always legal against its own ground.

---

### 3.4.10 Footer

```css
.site-footer {
  border-top: 1px solid var(--rule);
  padding-block: var(--s-6) var(--s-8);
  font-family: var(--f-mono); font-size: var(--t-mono-xs);
  letter-spacing: var(--ls-mono); color: var(--ink-3);
}
.site-footer__in { display: grid; grid-template-columns: minmax(0, 1fr) auto;
                   gap: var(--s-5); align-items: start; }
.colophon { max-width: 52ch; line-height: 1.7; }
.colophon a { border-bottom: 1px solid var(--rule-strong); }
@media (max-width: 47.999rem) { .site-footer__in { grid-template-columns: 1fr; } }
```

**Colophon copy** (this is free credibility with the devtools audience, and it is written in his voice):

> Built with Astro. No UI framework, no CSS framework, under 1KB of JavaScript. Type is Instrument Serif and Inter, self hosted. Static, deployed from GitHub Actions. Source is on GitHub.

Right cell: `© 2026 Sanket Shah`. Remove the inline `style` attribute currently on this element and delete the duplicated `width:var(--w)`.

---

### 3.4.11 Case study page

```html
<article class="wrap case railed">
  <div class="case__rail">
    <a class="backlink" href="/#work">← All work</a>
    <dl class="spec">
      <div><dt>Where</dt><dd>Time Dynamics</dd></div>
      <div><dt>When</dt><dd>2024 – 2025</dd></div>
      <div><dt>Built with</dt><dd class="spec__stack">Python · Claude · Gemini · …</dd></div>
      <div><dt>Status</dt><dd class="spec__status" data-live="false">Reached demo. Deprioritised before it went live.</dd></div>
    </dl>
  </div>

  <div class="case__main">
    <h1 class="case__h1">Maritime Document Intelligence</h1>
    <p class="case__tag">Automated delay cost calculation from unstructured shipping documents.</p>
    <div class="case__body"><Content /></div>
  </div>
</article>

<nav class="case-nav wrap" aria-label="Other projects"> … two register rows … </nav>
```

```css
.case { padding-block: var(--s-7) var(--s-9); align-items: start; }
@media (min-width: 64rem) {
  .case { grid-template-columns: minmax(0, 1fr) 15rem; }   /* rail on the RIGHT here */
  .case__rail  { grid-column: 2; position: sticky;
                 top: calc(var(--header-h) + var(--s-6)); }
  .case__main  { grid-column: 1; }
}

.backlink { font-family: var(--f-mono); font-size: var(--t-mono-xs);
            letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--ink-3); }
.backlink:hover { color: var(--ink); }

.case__h1  { margin-top: var(--s-5); font-size: var(--t-h2); max-width: 20ch; }
.case__tag { margin-top: var(--s-3); font-family: var(--f-display); font-style: italic;
             font-size: var(--t-lead); line-height: 1.45; color: var(--ink-2); max-width: 44ch; }

.case__body { margin-top: var(--s-7); max-width: var(--measure);
              font-size: 1.125rem; line-height: var(--lh-prose); color: var(--ink-2); }
.case__body > p:first-of-type {              /* editorial lead paragraph */
  font-size: 1.25rem; line-height: 1.55; letter-spacing: -0.005em; color: var(--ink);
}
.case__body p + p { margin-top: var(--s-5); }
.case__body strong { color: var(--ink); font-weight: 500; }

.spec { margin-top: var(--s-7); border-top: 1px solid var(--ink); }
.spec > div { border-bottom: 1px solid var(--rule); padding-block: var(--s-3); }
.spec dt { font-family: var(--f-mono); font-size: var(--t-mono-xs);
           letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--ink-3); }
.spec dd { margin-top: var(--s-2); font-size: var(--t-sm); color: var(--ink); }
.spec__stack { font-family: var(--f-mono); font-size: var(--t-mono);
               line-height: 1.8; color: var(--ink-2); }
.spec__status { position: relative; padding-left: 1.1em; }
.spec__status::before { content: ""; position: absolute; left: 0; top: 0.5em;
  width: 7px; height: 7px; border-radius: 50%; border: 1px solid var(--ink-3); }
.spec__status[data-live="true"]::before { background: var(--accent); border-color: var(--accent); }

@media (max-width: 63.999rem) {
  .spec { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: var(--s-6); }
  .case__rail { order: 2; margin-top: var(--s-8); }
  .backlink { display: block; margin-bottom: var(--s-4); }
}
```

**Fix the dead-end bug.** Replace the sibling filter with the canonical global order used by the home page:

```ts
const all = (await getCollection('projects'));
const rank = (id: string) => companies.findIndex(c => c.id === id);
const ordered = [...all].sort((a,b) =>
  rank(a.data.company.id) - rank(b.data.company.id) || a.data.order - b.data.order);
const i = ordered.findIndex(x => x.data.slug === p.slug);
const prev = ordered[(i - 1 + ordered.length) % ordered.length];
const next = ordered[(i + 1) % ordered.length];
```

Wrapping, so every one of the ten pages has both. `.case-nav` renders them as two half-width register rows with the same hover marker, so the case page ends in the same visual language it started in.

## 3.5 Motion

### The signature moment

> **The register rules itself.** As each group of rows scrolls into view, the 1px hairline above each row draws from left to right, and the row's contents set themselves a beat behind it. It reads, unmistakably, like a ledger being ruled and then typed, line by line, down the page. It is not a stock effect, it repeats ten times so the visitor learns it, it is 40 lines of CSS plus one IntersectionObserver, and it is the only thing on the site that any of his competitors' sites also does zero of.

### The table

| # | Cue | Trigger | Property | Duration | Delay | Easing | Reduced-motion fallback |
|---|---|---|---|---|---|---|---|
| 1 | **Rule draw** *(signature)* | IO enter, `rootMargin: 0px 0px -12% 0px` | `.row::before` `transform: scaleX(0→1)`, origin left | **420ms** | `calc(var(--i) * 40ms)`, `--i` = index within group, uncapped | `--ease-out` | Rule painted at `scaleX(1)`, no animation |
| 2 | **Row set** *(signature)* | same IO entry | `opacity 0→1`, `translateY(10px→0)` | **480ms** | `calc(var(--i) * 40ms + 60ms)` | `--ease-out` | `opacity` 1, `transform` none, no animation |
| 3 | Hero masthead | load | `translateY(0.55em→0)` inside `overflow: clip` line box, `opacity 0→1` | **720ms** | 0 / 90 / 180 / 270 / 360ms by `data-enter` | `--ease-out` | Rendered final, no animation |
| 4 | Portrait plate | load | `opacity 0→1`, `clip-path: inset(0 0 100% 0 → inset(0))` | **760ms** | 200ms | `--ease-out` | Rendered final |
| 5 | **Row ground** | `:hover` / `:has(a:focus-visible)` / `:active` | `background-color` → `--row-hover` (a ~3% shift; **no text colour changes**) | **140ms** | 0 | `--ease-std` | **Retained at 140ms.** Colour transitions are not vestibular motion. |
| 5b | **Row marker** | same | `.row::after transform: scaleY(0→1)`, origin top | **220ms** | 0 | `--ease-out` | Marker appears at `scaleY(1)`, no transform |
| 5c | Row name underline | same | `text-decoration-color` transparent→accent | 140ms | 0 | `--ease-std` | Retained |
| 6 | Row numeral → accent | same | `color` (decorative ordinal only) | 140ms | 0 | `--ease-std` | Retained |
| 7 | Row arrow | same | `transform: translateX(0→6px)` + `color` | 220ms | 0 | `--ease-snap` | Transform removed. Arrow static, colour still changes. |
| 8 | Chart bars | IO enter | `transform: scaleX(0→1)`, origin left | **560ms** | `calc(var(--r) * 60ms)` by row | `--ease-out` | Bars at full width |
| 9 | Chart ticks | IO enter | `opacity 0→1`, `scaleY(0→1)` | 240ms | `560ms + var(--r)*60ms` | `--ease-out` | Painted |
| 10 | Scroll progress bar | `scroll(root block)` | `transform: scaleX()` | scroll-linked | — | `linear` | `display: none` on `.site-header::after`. It is scroll-linked motion; it goes. |
| 11 | Header hairline | `scroll(root block)`, range `0 48px` | `border-bottom-color` | `steps(1, end)` | — | — | Hairline permanently on |
| 12 | Ticker marquee | always | `translateX(0 → -50%)` | **60,000ms** infinite, paused on `:hover`/`:focus-within` | 0 | `linear` | `animation: none`. Track shows the first row, clipped. |
| 13 | Nav underline | `:hover` / `:focus-visible` | `transform: scaleX(0→1)`, origin left | 240ms | 0 | `--ease-out` | Underline appears instantly, no transform |
| 14 | `.link` underline weight | `:hover` | `border-bottom-width 1→2px`, `border-bottom-color → accent` | 140ms | 0 | `--ease-std` | Retained (colour + 1px) |
| 15 | Portrait duotone lift | `.plate:hover` | `::after opacity 1→0`, `img filter grayscale(1→0)` | 320ms | 0 | `--ease-std` | Applied instantly on hover, no transition |
| 16 | Theme swap | click | `body background-color`, `color` | 220ms | 0 | `--ease-std` | Retained (colour only) |
| 17 | Ink band wipe | IO enter | `clip-path: inset(0 100% 0 0) → inset(0)` | 640ms | 0 | `--ease-out` | Band painted at full size |
| 18 | Resume button | `:hover` | `filter: brightness(1 → 1.06)` | 140ms | 0 | `--ease-std` | Retained |
| 19 | Skip link | `:focus` | `translateY(-100% → 0)` | 160ms | 0 | `--ease-out` | Appears instantly |
| 20 | Focus ring | `:focus-visible` | `outline` | **0ms, always** | 0 | none | Identical |

### Gating

Motion is *added* under `no-preference`, never subtracted under `reduce`. The `[data-motion="on"]` attribute gate goes away with the toggle; the media query is the only gate.

```css
@layer motion {
  @media (prefers-reduced-motion: no-preference) {
    /* everything in the table above lives here */
  }
  /* keyframes may live outside; they are inert unless referenced */
}
```

**Retained verbatim from the current build:** the authored HTML is the finished page; nothing is `opacity: 0` unless the script sets `data-armed`; only elements below the fold at load are armed; a 4-second `setTimeout` un-arms anything still hidden. Port this logic to `.row`, `.chart__bar` and `.band`.

### JavaScript budget

| Function | Raw | Verdict |
|---|---|---|
| Pre-paint theme resolve (inline) | ~180 B | Keep, drop the motion branch |
| Theme toggle (inline) | ~320 B | Keep, drop the motion branch, add `aria-label` sync |
| Reveal IntersectionObserver + failsafe | ~640 B | Keep, retarget |
| Chart bar reveal | shares the same observer | Free |
| ~~Header stuck state~~ | ~180 B | **Delete.** Replaced by `animation-timeline: scroll()`. |
| ~~Cursor spotlight~~ | ~330 B | **Delete.** Invisible on a boxless register. |
| ~~Magnetic buttons~~ | ~520 B | **Delete.** Moves the hit target away from the cursor. |
| ~~Canvas constellation~~ | ~2,500 B | **Delete.** See below. |
| ~~Motion toggle~~ | ~200 B | **Delete.** Already agreed. |

**Total: ~1.15 KB raw, roughly 0.7 KB gzipped.** Down from ~4 KB. Budget was 12 KB. That number goes in the colophon.

### Verdict on the canvas constellation: **delete it**

Three independent reasons, any one sufficient:

1. **It signals template.** A drifting particle field with proximity-linked lines is on thousands of developer portfolios. It is the single most recognisable "I used a snippet" effect on the web. He asked not to look generic; this is the generic.
2. **It costs real main-thread time in front of the exact audience he wants.** Up to 130 nodes, an O(n²) neighbour pass = up to 8,385 `Math.hypot` calls and up to 8,385 `beginPath`/`stroke` pairs, every frame, forever. An engineer with the Performance panel open sees a solid green bar of scripting on an idle page. The IntersectionObserver pause is good engineering, but it only stops the cost when the hero is off screen — which is exactly when nobody was paying for it anyway.
3. **It carries no information, and its replacement does.** The career chart occupies a comparable amount of visual real estate, is drawn from his actual employment dates, is 40 lines of CSS, costs zero bytes of JavaScript, and tells a hiring manager something true in one glance. Swapping decorative motion for informational graphics is the whole argument of this redesign in one trade.

### Verdict on GSAP: **remove it from `package.json`**

Every effect in the table above is CSS. GSAP core is ~23 KB min+gzip, which would nearly triple the JS budget for zero capability that CSS `@keyframes`, transitions, one IntersectionObserver and `animation-timeline: scroll()` do not already provide. Leaving an unused 23 KB animation library in `dependencies` is a thing the devtools audience will notice and draw a conclusion from.

## 3.6 What I am deliberately not doing

A design is defined by its cuts. These are refusals, not omissions.

1. **No View Transitions / no page transition crossfade.** Eleven routes, 120 words each. A crossfade buys a fraction of a second of perceived continuity and costs a class of bugs (double-fire on fast clicks, back-button flash, focus loss on navigation). Instant navigation *is* the polish.
2. **No smooth-scroll library.** No Lenis, no Locomotive. Hijacking the scroll wheel is the fastest way to make a portfolio feel broken on a trackpad, and it breaks `scroll-margin-top`, in-page anchors, and find-in-page.
3. **No custom cursor.** Non-existent on touch, invisible to anyone using keyboard navigation, and a reliable source of pointer-offset bugs. It is a 2021 tic.
4. **No glassmorphism.** The header `backdrop-filter: blur(14px) saturate(1.4)` is removed. It costs a compositing layer and a backdrop read on every scroll frame to produce an effect that is essentially invisible over `#F4F3EF`.
5. **No project filter UI, no tag cloud, no search.** Ten items in five perceivable groups. A filter is a control that tells the visitor there is too much to read.
6. **No metric counters that animate upward.** He is unusually careful about what he will claim. `"Served 600+ customers. Then we stopped."` counting up to 600 would turn honesty into a growth-metric flourish and undo the tone.
7. **No logo wall, no testimonials.** He has no employer logos he is free to display and nobody has given him a public quote. A greyed-out logo strip is the emptiest thing a portfolio can contain.
8. **No blog, no `/now`, no `/uses`.** Nothing to fill them with, and a stale blog whose last post is dated eleven months ago is worse than no blog.
9. **No 3D, no WebGL, no video, no Lottie.** The imagery budget is zero, so the imagery is generated from data.
10. **No rounded cards, no drop shadows, no gradient buttons, no icon set.** Named explicitly because these are the four things that will try to creep back in during implementation.
11. **No hamburger menu.** Four links, one scrolling page. A menu overlay is 2 KB of JavaScript, a focus trap, a scroll lock, an `aria-expanded` state and an escape-key handler, to replace a horizontally scrolling strip that costs nothing.
12. **No second accent colour.** One hex, six appearances. Two accents means every future decision requires choosing between them, and within a month there will be four.

---

# PART 4 — BUILD ORDER

Build in this sequence. Do not skip ahead; steps 1–3 are the foundation and a mistake there propagates into every component.

| # | Step | Definition of done |
|---|---|---|
| 1 | **Fonts.** Subset Instrument Serif 400 + 400italic to latin, `woff2`. Delete `sora-600.woff2`, `sora-700.woff2` and their `@font-face` rules. Add the `IS Fallback` metric-override face. Preload `instrument-serif-400` and `inter-400` only. | `du -ch public/fonts/*.woff2` ≤ 50 KB. No 404s. No layout jolt on a throttled 3G reload. |
| 2 | **Tokens + reset + base.** Replace `@layer tokens` and `@layer base` wholesale. Keep the `@layer` order line and the `overflow-x: clip` comment verbatim. | A blank page with one `h1`, one `p`, one `<a>` and one `<hr>` looks correct and intentional in light *and* dark, with no other CSS written. Do not proceed until this is true. |
| 3 | **Layout primitives.** `.wrap`, `.section`, `.railed`, `.measure`, `.bleed`, `.vh`, and the global `scroll-margin-top`. | The rail lines up at 1024 and 1440. Anchor links land below the header. |
| 4 | **Chrome.** Header, `.navstrip`, footer, colophon, skip link, `:focus-visible` ring, the CSS scroll-progress bar and the `animation-timeline` header hairline. Delete the motion toggle and the three header social icons. Delete every inline `style` attribute in `BaseLayout.astro`. | Tab through the whole page with no content: every stop has a visible ring. Header works with JS disabled. |
| 5 | **Hero.** Masthead strip, the two-part `h1`, body, CTA links, fact strip, duotone plate. | Renders at 390 / 768 / 1024 / 1440 in both themes with no horizontal scroll and no orphaned word in the claim. |
| 6 | **Ticker.** Swap `profile.ts → ticker` to the ten status strings. | Loops seamlessly; pauses on hover and on focus-within. |
| 7 | **Career chart.** Frontmatter month math first, verified against the five company date ranges, *then* the CSS. | Bars land on the correct years. Ten ticks, one per project. |
| 8 | **The register.** Company grouping, sticky rail, the row grid, the hover marker, all responsive variants. Static, no motion yet. **This is the majority of the work — budget accordingly.** | Ten rows, five groups. Numeral and date never touch at any width from 320 to 2560. Keyboard focus rings the whole row. |
| 9 | **Toolkit, Education, Signal band.** | Skills section ≤ 400px tall. |
| 10 | **Case study page.** Sticky spec rail, italic tagline, lead paragraph, and the prev/next wrap-around fix. | All ten case pages have both a prev and a next. |
| 11 | **Motion layer.** One `@layer motion` block, one `@media (prefers-reduced-motion: no-preference)` wrapper, plus the ~40 lines of JS. Port the arming/failsafe logic. | Every row of the motion table verified. |
| 12 | **Audit.** axe DevTools clean. Lighthouse ≥ 98 on all four. Full keyboard run. Full JS-disabled run. Full reduced-motion run. Screenshots at 390 / 768 / 1024 / 1440 × light/dark = 8 frames. Remove `gsap` from `package.json` and run a clean install. | All green. `node_modules` no longer contains gsap. |

## The three things that would most damage the result if done badly

### 1. The register row grid

Everything rests on ten rows whose five columns align to the pixel down the entire page. If any track is `auto` or content-sized, the numerals stop being a column and the dates stop being a column, the collision comes straight back the first time a date string gets longer, and the page reverts to a stack of loosely aligned text blocks — which is exactly the "generic bordered rectangles" problem in a new costume. **Every track in `.row` must be a fixed `rem` value or an explicit `minmax(0, Nfr)`. Never `auto`. Never `position: absolute` inside a row.** Also verify the sticky company header actually sticks: it fails silently the moment anyone adds `overflow: hidden` to `.section` or `.wrap`.

### 2. The accent

`--accent` is the entire personality of this site and it is one hex pair used six times. Used a seventh, eighth, tenth time it stops being an accent and becomes a theme, and the page drops from posh to busy — a one-way door that happens by accretion, one "just this once" at a time. If a new element seems to need the accent, the correct answer is almost always a hairline in `--rule-strong`. And enforce rule 3: **accent marks, it never narrates.** The moment a sentence is set in vermilion, the design is gone.

Related, and learned the hard way on the first pass: **do not let hover states change the colour of text.** The row hover shifts the ground by 3%, raises a 2px marker and underlines the name. That is the ceiling. If someone "improves" it into a full inversion, a tint on the tagline, or an accent-coloured project name, the register becomes unreadable to sweep and the whole section fails at the one job it has.

### 3. Density

Every instinct during implementation will be to add padding back. Rows will feel tight at first; they are supposed to. `padding: var(--s-4)` on a register row, `line-height: 1.9` running mono text instead of 58 pills, and `--section-y` at 56–88px instead of 144px are the three decisions that make the page stop feeling bulky, and all three will feel wrong for about a day. **If a single card, a single `border-radius` above 4px, or a single `box-shadow` with a blur radius appears anywhere during the build, the redesign has failed and should be reverted to step 2.**
