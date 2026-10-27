---
order: 7
company: "time-dynamics"
name: "Codebase Assistant"
slug: "codebase-assistant"
start: 2025-10-01
end: 2025-10-01
tagline: "Ask a large unfamiliar codebase a plain question and get a grounded answer."
stack:
  - "Python"
  - "FastAPI"
  - "Gemini"
  - "ChromaDB"
  - "NetworkX"
status: "Internal tool. No evaluation harness, so no accuracy claim."
live: false
featured: false
---

I built this because I couldn't hold a large legacy Rails codebase in my head, and reading it file by file was costing me weeks.

It works on retrieval. Alongside vector search it builds a graph of how the concepts in the code relate to each other, because the question I actually had was never "where is this string" but "what would this change break". Simple questions go to a cheaper Gemini model and hard ones to a stronger one.

I never built an evaluation set for it, so I don't know how often it's right, and I'm not going to put a number on it. That gap is part of why I care so much about cited ground truth now.
