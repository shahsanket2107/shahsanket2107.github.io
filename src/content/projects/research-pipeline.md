---
order: 4
company: "time-dynamics"
name: "Adversarial Research Pipeline"
slug: "research-pipeline"
start: 2026-04-01
end: 2026-05-01
tagline: "One model proposes, another is paid to doubt it, and a person signs off."
stack:
  - "Python"
  - "FastAPI"
  - "Claude Code"
  - "Gemini"
  - "Next.js"
status: "Internal. Ran live research cycles, then I moved on."
live: false
featured: false
---

This is an LLM research pipeline for commodity markets. Gemini Deep Research writes the first pass. Then parallel Claude Code sub agents, one per proposed idea, are pointed at that first pass and told to argue against it rather than agree with it.

Two things make it work. Each agent has to do a minimum amount of research before it's allowed an opinion, including web searches in Chinese language sources. And evidence it can't verify costs the recommendation conviction, so a gap shows up in the output instead of disappearing into a confident sentence.

A person reviews every cycle in a small Next.js interface before anything downstream sees it. Post mortems feed forward into the next cycle. The score server is built so it can't see the future.

The lesson was about cadence. The thesis was correct, and the cadence killed it.
