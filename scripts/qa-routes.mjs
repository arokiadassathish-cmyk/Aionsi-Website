import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('src/pages');
const routes = new Set(['/']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile() && entry.name.endsWith('.astro')) {
      const relative = path.relative(root, full).replaceAll(path.sep, '/');
      if (relative === 'index.astro') routes.add('/');
      else if (!relative.includes('[') && relative.endsWith('.astro')) {
        routes.add(`/${relative.slice(0, -6)}`.replace(/\/index$/, '/'));
      }
    }
  }
}

function normalizeHref(href) {
  if (!href || !href.startsWith('/') || href.startsWith('//')) return null;
  const value = href.split('#')[0].split('?')[0];
  return value === '' ? '/' : value.replace(/\/$/, '') || '/';
}

const files = [];
async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collectFiles(full);
    else if (entry.isFile() && /\.(astro|ts|tsx|js)$/.test(entry.name)) files.push(full);
  }
}

await walk(root);
await collectFiles(path.resolve('src'));

const missing = new Map();
const hrefPattern = /(?:href|detailHref|canonical|url)\s*=\s*["'`]([^"'`]+)["'`]/g;

for (const file of files) {
  const content = await readFile(file, 'utf8');
  let match;
  while ((match = hrefPattern.exec(content)) !== null) {
    const href = normalizeHref(match[1]);
    if (!href || href.startsWith('/api/')) continue;
    const isDynamic = href.includes('$') || href.includes('{') || href.includes('[');
    if (!isDynamic && !routes.has(href)) {
      const relative = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
      const list = missing.get(href) ?? [];
      list.push(relative);
      missing.set(href, list);
    }
  }
}

if (missing.size) {
  console.error('Route QA failed. The following internal routes were not found:');
  for (const [href, filesForHref] of missing) {
    console.error(`- ${href}: ${filesForHref.join(', ')}`);
  }
  process.exit(1);
}

console.log(`Route QA passed: ${routes.size} static routes discovered; no missing literal internal links found.`);
