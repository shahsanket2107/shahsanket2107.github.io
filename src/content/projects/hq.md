---
order: 1
company: "independent"
name: "HQ"
slug: "hq"
start: 2026-09-01
end: null
tagline: "A terminal command center that runs a fleet of Claude Code agents and tells me which one needs me."
stack:
  - "Bun"
  - "TypeScript"
  - "React"
  - "tmux"
status: "I use it every day. Private."
live: true
featured: true
---

I was running several Claude Code sessions in scattered terminal tabs. I couldn't tell what was running, what was blocked and what had finished, and permission prompts sat unseen while agents waited.

HQ is one place for all of it. A side rail shows every agent grouped by project, with live status: needs me, working, done. I can approve or deny a permission prompt without leaving it. A macOS notification takes me straight to the agent that needs me. It also keeps the Mac awake while agents work, and brings projects and conversations back after a reboot.

A "brain" agent acts as chief of staff. It only delegates and never edits code. Work gets routed to the cheapest model that keeps quality: Opus plans and reviews, Sonnet builds, Haiku does mechanical work. Guard hooks block a few risky actions on worker agents.

The finding I like most came from measuring my own usage. Almost all the spend was cached context being re read, so I built automatic compaction, analysed real sessions, and then removed it again. At those cache hit rates, not compacting was cheaper.

It's about 4,700 lines of source and 4,400 lines of tests. It's a personal tool and the repo is private.
