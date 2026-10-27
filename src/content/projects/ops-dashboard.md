---
order: 1
company: "pairbo"
name: "Operations Dashboard"
slug: "ops-dashboard"
start: 2024-09-01
end: 2025-02-01
tagline: "Four tabs of operational data collapsed into one screen the ops team ran on daily."
stack:
  - "React"
  - "TypeScript"
  - "Node"
  - "Express"
  - "WebSocket"
status: "Shipped. Used daily."
live: false
featured: false
---

The operations team was reading four systems to answer one question. I built the dashboard that
put live order tracking, fulfilment status, merchant management and analytics in a single view,
and the backend underneath it. I was the fourth employee, and the company went from zero to more than ten business partnerships while I was there.

The interesting half was physical. The product only works if something actually gets printed at a
merchant's warehouse, so a large part of the engineering was knowing whether that happened, and
being able to debug a machine I could not walk up to. Status streamed back live, because a job
that silently fails is a customer who paid for nothing.
