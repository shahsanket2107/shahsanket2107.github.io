import { readHtmlFiles } from './_util.mjs';

/**
 * One h1 per page, monotonic heading order, every img has alt, every anchor has
 * discernible text, every details has a summary. Cheap, real, and written before
 * the colophon mentions it.
 */
export async function checkA11y(root) {
  const files = await readHtmlFiles(root);
  const violations = [];

  for (const { file, html } of files) {
    const body = html.replace(/<head[\s\S]*?<\/head>/i, '');

    const h1s = body.match(/<h1\b/gi) || [];
    if (h1s.length !== 1) violations.push(`${file}: ${h1s.length} h1 elements, expected exactly 1`);

    // Monotonic heading order: never skip a level going down.
    const levels = [...body.matchAll(/<h([1-6])\b/gi)].map((m) => +m[1]);
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] > levels[i - 1] + 1) {
        violations.push(`${file}: heading order jumps h${levels[i - 1]} to h${levels[i]}`);
        break;
      }
    }

    for (const img of body.match(/<img\b[^>]*>/gi) || []) {
      if (!/\balt\s*=/.test(img)) violations.push(`${file}: img without alt -> ${img.slice(0, 60)}`);
    }

    for (const a of body.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || []) {
      const text = a.replace(/<[^>]+>/g, '').trim();
      const labelled = /aria-label\s*=\s*"[^"]+"/i.test(a);
      if (!text && !labelled) violations.push(`${file}: anchor with no discernible text`);
    }

    for (const d of body.match(/<details\b[\s\S]*?<\/details>/gi) || []) {
      if (!/<summary\b/i.test(d)) violations.push(`${file}: details without summary`);
    }

    if (!/<main\b/i.test(body)) violations.push(`${file}: no main landmark`);
    if (!/lang\s*=\s*"/i.test(html)) violations.push(`${file}: html element has no lang`);
  }

  return {
    name: 'check-a11y',
    ok: violations.length === 0,
    violations,
    summary: `${files.length} pages scanned, ${violations.length} accessibility violations`,
  };
}
