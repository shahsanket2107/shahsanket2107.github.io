---
order: 8
company: "time-dynamics"
name: "Energy Trading Platform"
slug: "trading-platform"
start: 2024-10-01
end: null
tagline: "Trade lifecycle, pricing and settlement on a platform a real desk runs on."
stack:
  - "Ruby on Rails"
  - "MySQL"
  - "Redis"
  - "RabbitMQ"
  - "Docker"
status: "Live. I'm the one who gets the call when it breaks."
live: true
featured: false
---

This is the commodity trading and risk platform the company runs on, and it covers the full trade lifecycle. I didn't build it. I maintain it and I extend it.

My work is trade lifecycle features, mark to market pricing, settlements, and automated invoice and payment processing. Underneath it is a distributed worker architecture on RabbitMQ with nine async workers, Dockerized across dev, test and prod. Most of the interesting failures are timing and ordering, not logic.

It's the one system here where a person calls me when it breaks. Working on code I didn't write has taught me more about writing my own than anything I started from scratch.
