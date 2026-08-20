import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('src/pages');
const staticRoutes = new Set(['/']);
const dynamicRoutes = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.astro')) continue;

    const relative = path.relative(root, full).replaceAll(path.sep, '/');
    const withoutExtension = relative.slice(0, -'.astro'.length);
    const segments = withoutExtension.split('/');

    if (segments.at(-1) === 'index') {
      segments.pop();
    }

    const route = `/${segments.filter(Boolean).join('/')}` || '/';

    if (route === '/') {
      staticRoutes.add('/');
      continue;
    }

    if (segments.some((segment) => segment.startsWith('['))) {
      const pattern = segments.map((segment) => {
        if (/^\[\.\.\.[^\]]+\]$/.test(segment)) return '.+';
        if (/^\[[^\]]+\]$/.test(segment)) return '[^/]+';
        return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }).join('/');
      dynamicRoutes.push(new RegExp(`^/${pattern}/?$`));
    } else {
      staticRoutes.add(route);
    }
  }
}

function normalizeHref(href) {
  if (!href || !href.startsWith('/') || href.startsWith('//')) return null;
  const value = href.split('#')[0].split('?')[0];
  return value === '' ? '/' : value.replace(/\/$/, '') || '/';
}

function routeExists(href) {
  return staticRoutes.has(href) || dynamicRoutes.some((pattern) => pattern.test(href));
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

    const isDynamicExpression = href.includes('$') || href.includes('{') || href.includes('[');
    if (!isDynamicExpression && !routeExists(href)) {
      const relative = path.relative(process.cwd(), file).replaceAll(path.sep, '/');
      const list = missing.get(href) ?? [];
      if (!list.includes(relative)) list.push(relative);
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

console.log(`Route QA passed: ${staticRoutes.size} static routes and ${dynamicRoutes.length} dynamic route patterns discovered; no missing literal internal links found.`);
