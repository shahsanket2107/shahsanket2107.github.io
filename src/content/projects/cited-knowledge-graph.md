---
order: 1
company: "time-dynamics"
name: "Cited Knowledge Graph"
slug: "cited-knowledge-graph"
start: 2026-09-01
end: null
tagline: "832 small notes, each one cited fact, that every Claude Code session checks first."
stack:
  - "Claude Code"
  - "Python"
  - "Markdown"
  - "HTML"
status: "In daily use inside the company. Private."
live: true
featured: true
---

A Claude Code session once told us something couldn't be done. The docs had the exact steps. The model wasn't lying, it just had no reason to go look.

So I turned our platform docs, which change constantly, into a knowledge graph. One note is one fact, with a citation back to the section it came from. There's an index that maps exact error strings to the fact that explains them, and an HTML explorer so a person can browse it too.

Then I made it the default. A standing rule in the workspace tells every session to check the graph before it answers a question about what's possible.

The part I care about most is that it can be audited. Mechanical checks confirm every fact has a citation and every doc section is covered, and a second pass verifies the notes against the source text. The graph passes its audit at 100 percent, and when the docs change, the audits tell me what went stale.

Agents are only as good as the ground truth they can cite. This is that ground truth.
