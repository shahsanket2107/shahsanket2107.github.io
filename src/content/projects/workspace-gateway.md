---
order: 5
company: "time-dynamics"
name: "Workspace Platform Gateway"
slug: "workspace-gateway"
start: 2025-05-01
end: 2026-03-01
tagline: "The front door for a product that did not have one: signup, provisioning, teams and billing."
stack:
  - "Next.js"
  - "Node"
  - "Express"
  - "TypeScript"
  - "Firestore"
status: "Live since August 2025."
live: true
featured: true
---

The product existed and there was no way to buy it. A stranger could not sign up, get an
environment provisioned, invite their team or pay, so every customer was onboarded by hand.

I built the gateway that does all four, plus the marketing site in front of it. Sign in works across
Google, Apple and Feishu, and the Feishu flow works nothing like the other two.

The real problem was not authentication. It was identity federation across a boundary I did not
own: my service holds the account, another team's service holds the environment, and a signup on
the website has to become a user in a table I have no control over. That is where the bugs were. The
one that reached production twice only ever broke for some users and not others, so it took a
long time to catch.
