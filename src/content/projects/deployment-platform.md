---
order: 1
company: "cargurus"
name: "Deployment Platform"
slug: "deployment-platform"
start: 2023-07-01
end: 2023-12-01
tagline: "Kubernetes tooling that standardised how every team at the company ships."
stack:
  - "Kubernetes"
  - "AWS"
  - "Docker"
status: "Shipped. Cut deployment support load by about two weeks a month."
live: false
featured: false
---

I worked on the internal platform that every other engineering team ships through, so a bug in
it is a bug in everyone's day.

I built Kubernetes Job backed remote builds for the platform CLI, which made builds about 10 percent faster. I also built a Kubernetes operator that standardises deployments, and that saved roughly two weeks a month of support.

The fix I'm most pleased with was a reconciliation loop that reprocessed work it had
already done, quietly piling up dead resources in real clusters. Filtering the events that could
not change the outcome fixed it.

I also spent time making failures visible. An invalid configuration used to hang the CLI on
"deploying" forever while it waited for something that was never going to be created. It now
returns an actual error.

Separately, cost: a Slackbot that cleaned up idle environments cut cloud spend 45 percent, and
moving container nodes off AWS Europe onto underused servers saved another 2,500 dollars a month.
