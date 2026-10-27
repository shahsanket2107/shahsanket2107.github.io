/**
 * Home page content that isn't a project page: lanes, beliefs, kill notes,
 * the console script and the timeline. Every project slug here must exist in
 * src/content/projects, and the home page fails the build if one doesn't.
 */

export type LaneId = 'trading' | 'agents' | 'shipped';

export interface Lane {
  id: LaneId;
  num: string;
  title: string;
  /** Short chip label. */
  chip: string;
  sub: string;
  /** slug and the short status label on the card. `on` fills the status dot. */
  items: { slug: string; status: string; on: boolean }[];
  earlier?: { slug: string; label: string }[];
}

export const lanes: Lane[] = [
  {
    id: 'trading',
    num: 'A',
    title: 'Trading systems and quant research',
    chip: 'Trading and quant',
    sub: 'Where the money math lives.',
    items: [
      { slug: 'systematic-futures', status: 'ongoing · methods only', on: true },
      { slug: 'trading-platform', status: 'in production · I get the call', on: true },
      { slug: 'research-pipeline', status: 'internal · ran live cycles', on: false },
      { slug: 'document-intelligence', status: 'demo ready · never live', on: false },
    ],
  },
  {
    id: 'agents',
    num: 'B',
    title: 'AI agent tooling',
    chip: 'Agent tooling',
    sub: 'Making agents cite, check and report.',
    items: [
      { slug: 'cited-knowledge-graph', status: 'in daily use · private', on: true },
      { slug: 'kg-plugin', status: 'built · private repo', on: false },
      { slug: 'hq', status: 'daily driver · private', on: true },
      { slug: 'codebase-assistant', status: 'internal · no accuracy claim', on: false },
    ],
  },
  {
    id: 'shipped',
    num: 'C',
    title: 'Products shipped',
    chip: 'Products shipped',
    sub: 'Things people can open.',
    items: [
      { slug: 'workspace-gateway', status: 'live since Aug 2025', on: true },
      { slug: 'clarvis', status: 'open source · v1.0', on: true },
      { slug: 'interpreter', status: 'private · daily use', on: true },
    ],
    earlier: [
      { slug: 'ops-dashboard', label: 'Pairbo ops dashboard' },
      { slug: 'deployment-platform', label: 'CarGurus deploy platform' },
      { slug: 'rate-limiting', label: 'Oracle 5G rate limiting' },
      { slug: 'local-commerce', label: 'WeLocal' },
    ],
  },
];

export const beliefs = [
  {
    quote: 'The LLM decides which rule applies. Python decides what the number is.',
    slug: 'document-intelligence',
  },
  {
    quote: "The strategies got simpler and the validation got harder, and that's when things started working.",
    slug: 'systematic-futures',
  },
  {
    quote: 'Partial correctness in a money calculation is worse than a blank field.',
    slug: 'document-intelligence',
  },
  {
    quote: 'Deploy beside, never over.',
    slug: 'systematic-futures',
  },
];

/** Words only. No strategy, instrument, parameter or figure, ever. */
export const killNotes = [
  {
    tag: 'Validation',
    title: 'A great backtest. Walk forward said no.',
    body: 'Every mechanism that improved the training fit made the held back results worse. Killed it and wrote down why.',
  },
  {
    tag: 'Falsification',
    title: 'Fitting the parameters harder.',
    body: "Two studies showed it didn't beat random parameters. Shipped static ones instead.",
  },
  {
    tag: 'Cadence',
    title: 'The thesis was right. The cadence killed it.',
    body: 'An LLM research pipeline found real ideas, just not on a schedule a strategy could use.',
  },
  {
    tag: 'Root cause',
    title: 'My own root cause was wrong.',
    body: 'A report disagreed with the server. I traced it trade by trade, retracted my first answer, and found a contract roll convention mismatch.',
  },
];

export const agents = [
  { name: 'portfolio', model: 'opus', state: 'needs me', tone: 'amber' },
  { name: 'kg plugin', model: 'sonnet', state: 'working', tone: 'blue' },
  { name: 'research', model: 'sonnet', state: 'working', tone: 'blue' },
  { name: 'cleanup', model: 'haiku', state: 'done', tone: 'dim' },
] as const;

export const timeline = [
  ['2020', 'Cofounded WeLocal in India'],
  ['2022', 'Oracle intern. Started MS CS at Northeastern'],
  ['2023', 'Platform engineering at CarGurus'],
  ['2024', 'Pairbo, then Time Dynamics'],
  ['2025', 'Quant research on Chinese futures'],
  ['2026', 'Knowledge graph, kg, HQ, Clarvis, Interpreter'],
] as const;

/** Which lane a project lives in, for the kicker on its page. */
export function laneOf(slug: string): Lane | undefined {
  return lanes.find(
    (l) => l.items.some((i) => i.slug === slug) || l.earlier?.some((e) => e.slug === slug)
  );
}

/** Beliefs that a given project taught. */
export function beliefsFrom(slug: string) {
  return beliefs.filter((b) => b.slug === slug);
}
