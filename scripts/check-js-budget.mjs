import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { walk, toPath } from './_util.mjs';

const CEILING_KB = 40;

/**
 * Sums gzipped JS and writes the measured numbers to a JSON the colophon reads,
 * so the colophon can never claim a budget the build missed.
 */
export async function checkJsBudget(root) {
  const dir = toPath(root);
  const jsFiles = await walk(dir, ['.js', '.mjs']);

  let total = 0;
  const per = [];
  for (const f of jsFiles) {
    const buf = await readFile(f);
    const gz = gzipSync(buf).length;
    total += gz;
    per.push({ file: f.replace(dir, ''), gzip: gz });
  }
  per.sort((a, b) => b.gzip - a.gzip);

  const totalKb = +(total / 1024).toFixed(2);

  // Also measure the CSS, because the colophon publishes it.
  const cssFiles = await walk(dir, ['.css']);
  let cssTotal = 0;
  for (const f of cssFiles) cssTotal += gzipSync(await readFile(f)).length;

  const measured = {
    jsGzipKb: totalKb,
    cssGzipKb: +(cssTotal / 1024).toFixed(2),
    files: per.slice(0, 12),
    ceilingKb: CEILING_KB,
    measuredAt: new Date().toISOString().slice(0, 10),
  };

  const out = join(dirname(dir.replace(/\/$/, '')), 'src', 'generated', 'metrics.json');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify(measured, null, 2));

  const ok = totalKb <= CEILING_KB;
  return {
    name: 'check-js-budget',
    ok,
    violations: ok ? [] : [`JS is ${totalKb}KB gzipped, ceiling is ${CEILING_KB}KB`],
    summary: `${totalKb}KB JS + ${measured.cssGzipKb}KB CSS gzipped across ${jsFiles.length} files (ceiling ${CEILING_KB}KB)`,
  };
}
