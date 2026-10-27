---
order: 3
company: "time-dynamics"
name: "Quant Research and Trading Engineering"
slug: "systematic-futures"
start: 2025-10-01
end: null
tagline: "Strategy research, validation and live monitoring on Chinese commodity futures."
stack:
  - "Python"
  - "Pandas"
  - "NumPy"
  - "SciPy"
  - "C++ platform"
status: "Several books live. Methods only, no track record."
live: true
featured: true
---

For about a year I've worked on Chinese commodity futures, building on the company's proprietary C++ and Python trading platform. I own the strategy implementation, risk rules, validation method, deployment and live monitoring. I knew nothing about the market on day one: sessions, calendars, price limits, contract rolls, fees, margin. I learned it with AI to compress the ramp, and then insisted on proof.

I've researched a lot of strategies and killed most of them, each with a one paragraph note on why. That note is the entire return on a failed experiment.

Most of the work turned out not to be the strategies. It's the validation. Walk forward testing, random null baselines, studies written down before they're run, leakage guards that hard fail a pipeline, and checks that an offline engine matches the deployed one trade for trade. Live incidents get a root cause, and the fix is gated behind a restart equivalence check. New versions deploy beside the old ones, never over them.

The strategies got simpler and the validation got harder, and that's when things started working.

It's my employer's work, so I can talk about how it works but not about how it has done.
