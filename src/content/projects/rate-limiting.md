---
order: 1
company: "oracle"
name: "Distributed Rate Limiting"
slug: "rate-limiting"
start: 2022-01-01
end: 2022-07-01
tagline: "Turning limits on each node into a global limit enforced across a 5G core network."
stack:
  - "Java"
  - "Spring Boot"
  - "Distributed caching"
status: "Shipped into a US carrier's network."
live: false
featured: false
---

This was traffic control inside a US carrier's 5G core network. Every node in it could already
enforce its own limit. Nobody could enforce one limit across all of them at once, which is the
limit that actually matters.

I built the coordination layer that does, using a federated cache to keep the counters in step
across every node in the cluster. The constraint that made it hard is that this sits in the path
of live traffic, so the coordination cannot cost latency and it cannot drop messages. It held
under a tenth of a percent message loss, with the enforced limit staying within five percent of
the configured one.

It is the only place I have written production Java, and the testing culture there is still the
bar I measure against.
