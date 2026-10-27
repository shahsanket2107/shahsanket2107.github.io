import { readHtmlFiles, visibleProse } from './_util.mjs';

/**
 * The AI-tell list from PROJECT_BRIEF section 0.4, enforced at build rather
 * than by discipline. Discipline degrades under volume; a non zero exit does not.
 */
const BANNED = [
  'seamlessly', 'robust', 'cutting-edge', 'cutting edge', 'state-of-the-art',
  'state of the art', 'leverage', 'leveraging', 'leveraged', 'spearhead',
  'spearheaded', 'delve', 'synergy', 'holistic', 'utilize', 'utilizing',
  'utilise', 'best-in-class', 'game-changing', 'revolutionize', 'revolutionise',
  'meticulous', 'passionate', 'results-driven', 'proven track record',
  'wealth of experience', 'testament to', 'underscores', 'furthermore',
  'moreover', 'tapestry', "it's worth noting", 'it is worth noting',
  'in today’s fast-paced', "in today's fast-paced", 'dive into', 'deep dive into',
  'unlock', 'elevate', 'boasts', 'showcasing', 'embark',
];

/** Real technical terms keep their hyphens. Everything else does not. */
const HYPHEN_ALLOW = [
  'Mark-to-Market', 'mark-to-market', 'look-ahead', 'walk-forward', 'back-adjustment',
  'open-interest', 'Co-op', 'co-op', 'Co-Founder', 'Co-founder', 'co-founder',
  'H-1B', 'e-mail', 'text-embedding-004', 'gemini-2', 'claude-3', 'qwen2', 'deepseek-r1',
  'prometheus-operator', 'ingress-nginx', 'time-sheet-parser',
  'sanket-shah', 'IBM-Plex', 'front-end', 'well-set',
  'google-generativeai', 'scikit-learn', 'cma-es', 'CMA-ES', 'local-llm', 'qwen2.5-coder',
  'deepseek-r1', 'x-amz', 'multi-agent', 'astro:build', 'font-display', 'grid-template',
  'Docker-compose', 'anti-correlated', 'e-mail',
];

const SHAPES = [
  { re: /\bnot just [^.!?]{2,40}\bbut\b/gi, name: 'Not-just-X-but-Y' },
  { re: /\bit'?s not about [^.!?]{2,40}\.\s*it'?s about\b/gi, name: 'It is not about X. It is about Y.' },
  { re: /\b(fast|reliable|scalable|clean|simple|modern)\s*,\s*\w+\s*,\s*and\s+\w+/gi, name: 'triadic padding' },
];

export async function checkBannedWords(root) {
  const files = await readHtmlFiles(root);
  const violations = [];

  for (const { file, html } of files) {
    const prose = visibleProse(html);
    const lower = prose.toLowerCase();

    for (const w of BANNED) {
      const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (re.test(lower)) violations.push(`${file}: banned word "${w}"`);
    }

    for (const { re, name } of SHAPES) {
      const m = prose.match(re);
      if (m) violations.push(`${file}: banned shape ${name} -> "${m[0].slice(0, 70)}"`);
    }

    if (/—|–/.test(prose)) {
      violations.push(`${file}: em dash or en dash in prose`);
    }

    if (/!/.test(prose.replace(/&\w+;/g, ''))) {
      violations.push(`${file}: exclamation mark. There are zero on this site.`);
    }

    // Hyphens outside the allowlist. Case insensitive, because a real technical
    // term is still a real technical term at the start of a sentence.
    let scrubbed = prose;
    for (const t of HYPHEN_ALLOW) {
      scrubbed = scrubbed.replace(
        new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
        ' '
      );
    }
    const stray = scrubbed.match(/\b[a-z]{2,}-[a-z]{2,}\b/gi);
    if (stray) {
      const uniq = [...new Set(stray.map((s) => s.toLowerCase()))];
      for (const s of uniq) violations.push(`${file}: hyphenated compound "${s}" not on the allowlist`);
    }
  }

  return {
    name: 'check-banned-words',
    ok: violations.length === 0,
    violations,
    summary: `${files.length} pages scanned, ${violations.length} violations`,
  };
}
