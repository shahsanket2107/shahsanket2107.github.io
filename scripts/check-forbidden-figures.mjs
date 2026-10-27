import { readHtmlFiles, visibleProse } from './_util.mjs';

/**
 * PROJECT_BRIEF section 0.2. The trading systems run on his employer's own
 * capital and are not a public track record. Methods and relative statistics
 * ship; returns, capital and commission never do.
 *
 * This check is the reason the disclosure gate held through four auditors.
 * It is cheap and it does not get tired.
 */
const FORBIDDEN = [
  'Sharpe', 'drawdown', 'out of sample', 'out-of-sample', 'backtest return',
];

/** Relative statistics are allowed and should not trip anything. */
const ALLOWED_NEAR = [];

export async function checkForbiddenFigures(root) {
  const files = await readHtmlFiles(root);
  const violations = [];

  for (const { file, html } of files) {
    const prose = visibleProse(html);

    for (const fig of FORBIDDEN) {
      if (prose.includes(fig)) {
        violations.push(`${file}: forbidden figure "${fig}"`);
      }
    }

    // Any currency figure at all inside trading content is suspect.
    const currency = prose.match(/[¥￥]\s?[\d,]{3,}/g);
    if (currency) {
      for (const c of [...new Set(currency)]) {
        violations.push(`${file}: yuan figure "${c}" — employer capital, never published`);
      }
    }

    // Percent returns attached to trading language.
    const tradingPct = prose.match(
      /(?:returned|return of|net|annualized|annualised|drawdown|P&L)\s*[^.]{0,24}?[+-]?\d{1,3}(?:\.\d+)?\s?(?:%|percent)/gi
    );
    if (tradingPct) {
      for (const t of [...new Set(tradingPct)]) {
        if (ALLOWED_NEAR.some((a) => t.includes(a))) continue;
        violations.push(`${file}: possible trading return "${t.trim().slice(0, 60)}"`);
      }
    }
  }

  return {
    name: 'check-forbidden-figures',
    ok: violations.length === 0,
    violations,
    summary: `${files.length} pages scanned, ${violations.length} disclosure violations`,
  };
}
