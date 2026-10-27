import { readdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, extname } from 'node:path';

/** Every file under a directory matching one of the given extensions. */
export async function walk(dir, exts) {
  const out = [];
  async function rec(d) {
    let entries;
    try {
      entries = await readdir(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = join(d, e.name);
      if (e.isDirectory()) await rec(p);
      else if (exts.includes(extname(e.name))) out.push(p);
    }
  }
  await rec(dir);
  return out;
}

export function toPath(url) {
  return typeof url === 'string' ? url : fileURLToPath(url);
}

export async function readHtmlFiles(rootUrl) {
  const root = toPath(rootUrl);
  const files = await walk(root, ['.html']);
  return Promise.all(
    files.map(async (f) => ({ file: f.replace(root, ''), html: await readFile(f, 'utf8') }))
  );
}

/**
 * Strip everything a reader never sees as prose: scripts, styles, and the
 * elements that legitimately carry verbatim technical strings (code excerpts,
 * commit messages, artifact blocks). A commit message he actually typed is
 * evidence, not copy, and holding it to the prose rules would be wrong.
 */
export function visibleProse(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ')
    .replace(/<[^>]+class="[^"]*\b(artifact|runlog__text|credits)\b[^"]*"[\s\S]*?<\/[a-z]+>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ');
}

export async function fileSize(p) {
  try {
    return (await stat(p)).size;
  } catch {
    return 0;
  }
}
