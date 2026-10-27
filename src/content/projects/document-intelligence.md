---
order: 6
company: "time-dynamics"
name: "Maritime Document Intelligence"
slug: "document-intelligence"
start: 2024-10-01
end: 2025-04-01
tagline: "Automated delay cost calculation from unstructured shipping documents."
stack:
  - "Python"
  - "Claude"
  - "Gemini"
  - "Google Document AI"
status: "Demo ready. Never went live."
live: false
featured: true
---

When a ship is chartered, the contract gives it a fixed allowance of hours to load or discharge.
That allowance is called laytime. Run past it and the charterer owes the owner money for every
hour over. Finish early and money is owed back the other way. Somebody has to decide which of
those happened and by how much, because that number goes out as an invoice.

Deciding it meant an analyst reading the contract and the port paperwork by hand. Scanned
documents, sixty pages, and no two counterparties lay anything out the same way. Then reading
the port log for when the vessel arrived, when notice was tendered, when work actually started
and stopped, and applying whichever clauses govern weather, holidays and shifting. That is hours
of careful work per voyage, and at the end of it you have a figure someone gets billed for.

I built a pipeline that does the reading and produces the calculation. Custom document
processors handle the scan and the layout. Above them sits a small set of agents with one job
each: find the governing clauses, pull the event timestamps, decide which exceptions apply,
assemble the statement.

The part I am proudest of is not the extraction. It is what happens when the answer is not
actually there.

I had the model doing the arithmetic at first. It could read a contract well and still get a
subtraction wrong, quietly, in a way that looked entirely reasonable on the page. So every
duration calculation moved out into plain Python. The model decides which rule applies. The code
works out the number. I found that out the slow way.

The other half is refusing to answer. If the allowance is missing, or the rate is missing, or
your own company turns out not to be a party to the contract at all, it blocks the calculation
rather than filling in a sensible default. A blank field gets asked about. A plausible wrong
number gets trusted, and then it gets sent.

It's five agents on the raw Claude and Gemini SDKs, with no framework, built before Claude Code
and MCP existed. Document AI only does the OCR. Everything semantic is the LLM. I later moved
the model from Claude to Gemini Flash on cost and latency.

It reached demo ready and was deprioritised before it went live. It never ran in production. I
still think the validation layer is the most useful thing in it. Partial correctness in a money
calculation is worse than a blank field.
