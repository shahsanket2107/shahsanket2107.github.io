// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { checkBannedWords } from './scripts/check-banned-words.mjs';
import { checkForbiddenFigures } from './scripts/check-forbidden-figures.mjs';
import { checkJsBudget } from './scripts/check-js-budget.mjs';
import { checkA11y } from './scripts/check-a11y.mjs';

/**
 * The four build checks run on astro:build:done and exit non zero on failure.
 * Four is the honest number. The colophon names these four and no others.
 */
function buildChecks() {
  return {
    name: 'disproof-file-build-checks',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }) => {
        const root = new URL('./', dir);
        const results = await Promise.all([
          checkBannedWords(root, logger),
          checkForbiddenFigures(root, logger),
          checkJsBudget(root, logger),
          checkA11y(root, logger),
        ]);
        const failed = results.filter((r) => !r.ok);
        for (const r of results) {
          const label = r.ok ? 'pass' : 'FAIL';
          logger.info(`[${label}] ${r.name}: ${r.summary}`);
          if (!r.ok) for (const v of r.violations) logger.error(`  ${v}`);
        }
        if (failed.length) {
          throw new Error(
            `${failed.length} build check(s) failed: ${failed.map((f) => f.name).join(', ')}`
          );
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://shahsanket2107.github.io',
  integrations: [sitemap(), buildChecks()],
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
