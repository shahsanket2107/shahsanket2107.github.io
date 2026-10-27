---
order: 2
company: "independent"
name: "Clarvis"
slug: "clarvis"
start: 2026-10-01
end: null
tagline: "An open source Avengers fan mod for Claude Code: a live cost HUD plus 30 heroes, all original art, reacting to what Claude is doing."
stack:
  - "TypeScript"
  - "Bun"
  - "Claude Code mods"
status: "Open source, v1.0.0, October 2026."
live: false
featured: false
---

Clarvis began as the visual skin for HQ and became its own project. It's a mod for Claude Code that draws a live heads up display above the prompt: a context gauge, tokens, cache hit rate, cost and rate limit.

Around that sits a small 3D stage with 30 Avengers inspired heroes, all drawn from scratch, who react to what Claude is actually doing. When a command really succeeds, parsed from its real output, there's a ship it celebration. There are also trophies, an arcade game and chiptune sound.

Under the toy is real engineering. It's about 40 modules of TypeScript and TSX on Bun, a truecolor terminal rasteriser with pre rendered ray marched art, 18 test files and CI. It makes no network calls and has no analytics.

Code: [github.com/shahsanket2107/clarvis](https://github.com/shahsanket2107/clarvis). Docs: [shahsanket2107.github.io/clarvis](https://shahsanket2107.github.io/clarvis).
