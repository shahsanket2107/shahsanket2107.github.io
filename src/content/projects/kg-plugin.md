---
order: 2
company: "time-dynamics"
name: "kg, a Claude Code plugin"
slug: "kg-plugin"
start: 2026-10-01
end: null
tagline: "Turns any document set into a cited, audited knowledge graph a whole team can attach to."
stack:
  - "Claude Code"
  - "Python"
  - "GitHub Actions"
status: "Built, with a passing test suite. Private repo."
live: false
featured: true
---

Once the company knowledge graph worked, the obvious next question was whether it could work for any doc set. kg is that, packaged as a Claude Code plugin.

It has 11 commands and 7 agents. You point it at a folder or a repo, it builds the graph, audits it, and publishes it. Someone builds the graph once, and everyone else on the team attaches to it with one command.

The design choice I'd defend is model tiering, and it's about trust. Haiku runs scripts and never judges meaning. Sonnet reads and screens, and has to quote its evidence. Opus confirms and audits. Nine deterministic checks sit underneath all of that, so nothing important depends on a model grading itself. A GitHub Actions pipeline runs 43 tests.

I'm not claiming adoption or time savings. It's built, it works on the docs I've pointed it at, and the repo is private for now.
