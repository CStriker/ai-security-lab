#!/usr/bin/env node
// Package this static site without changing its source files or publishing it.
import { lstat, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceRoot = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const pages = ['index.html', 'research.html', 'people.html', 'publications.html', 'news.html', 'contact.html'];
const fixedAssets = ['css/style.css', 'js/data.js', 'js/main.js', 'favicon.ico'];
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg', '.ico']);
const usage = 'Usage: node tools/prepare-deploy.mjs https://approved-host[/base-path/] [--output directory]';

function within(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function parseArgs(args) {
  if (args.length === 1 && ['--help', '-h'].includes(args[0])) return null;
  if (args.length !== 1 && !(args.length === 3 && args[1] === '--output')) throw new Error(usage);
  const raw = args[0];
  // Check before URL normalization, which otherwise silently removes dot segments.
  if (!/^https:\/\/[^/?#]+(?:\/[^?#]*)?$/i.test(raw) || /[\s\\\u0000-\u001f]/u.test(raw)) {
    throw new Error('Use an absolute HTTPS site URL without a query, fragment, whitespace, or backslash.');
  }
  const rawPath = raw.match(/^https:\/\/[^/]+(\/.*)?$/i)?.[1] || '/';
  for (const segment of rawPath.split('/')) {
    const decoded = decodeURIComponent(segment);
    if (decoded === '.' || decoded === '..' || /[\\/%?#\u0000-\u0020]/u.test(decoded)) {
      throw new Error('The site URL contains an unsafe path segment.');
    }
  }
  const base = new URL(raw);
  if (!base.hostname || base.username || base.password || base.search || base.hash || base.protocol !== 'https:') {
    throw new Error('Use an HTTPS hostname with an optional site path, without credentials.');
  }
  if (base.pathname.includes('//')) throw new Error('The site path must not contain repeated slashes.');
  if (!base.pathname.endsWith('/')) base.pathname += '/';
  const output = path.resolve(args[2] || path.join(sourceRoot, 'dist'));
  const defaultOutput = path.join(sourceRoot, 'dist');
  if (within(output, sourceRoot) || (within(sourceRoot, output) && output !== defaultOutput)) {
    throw new Error('Output must be the site\'s dist directory or a separate directory outside the source tree.');
  }
  return { base, output };
}

async function statIfExists(filename) {
  try { return await lstat(filename); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function rejectSymlinkPath(filename) {
  const absolute = path.resolve(filename);
  const root = path.parse(absolute).root;
  let current = root;
  for (const segment of absolute.slice(root.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    const stat = await statIfExists(current);
    if (!stat) break;
    if (stat.isSymbolicLink()) throw new Error(`Symbolic links are not supported: ${current}`);
  }
}

async function collectImages(directory = 'images') {
  const entries = await readdir(path.join(sourceRoot, directory), { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.')) continue;
    const relative = `${directory}/${entry.name}`;
    if (entry.isSymbolicLink()) throw new Error(`Image symbolic links are not supported: ${relative}`);
    if (entry.isDirectory()) files.push(...await collectImages(relative));
    else if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) files.push(relative);
  }
  return files;
}

function escapeMarkup(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i'))?.[2] || '';
}

function withMetadata(html, filename, base) {
  const head = html.match(/<head\b[^>]*>[\s\S]*?<\/head\s*>/i);
  if (!head) throw new Error(`Missing HTML head: ${filename}`);
  const pageUrl = new URL(filename === 'index.html' ? './' : filename, base).href;
  const imageUrl = new URL('images/logo.png', base).href;
  const clean = head[0].replace(/<(?:meta|link)\b[^>]*>/gi, tag => {
    if (/^<link\b/i.test(tag) && attribute(tag, 'rel').toLowerCase().split(/\s+/).includes('canonical')) return '';
    if (/^<meta\b/i.test(tag) && ['og:url', 'og:image'].includes(attribute(tag, 'property').toLowerCase())) return '';
    if (/^<meta\b/i.test(tag) && attribute(tag, 'name').toLowerCase() === 'twitter:image') return '';
    return tag;
  });
  const metadata = [
    '<!-- Deployment URLs generated from the approved site address. -->',
    `<link rel="canonical" href="${escapeMarkup(pageUrl)}" />`,
    `<meta property="og:url" content="${escapeMarkup(pageUrl)}" />`,
    `<meta property="og:image" content="${escapeMarkup(imageUrl)}" />`,
    `<meta name="twitter:image" content="${escapeMarkup(imageUrl)}" />`,
  ].join('\n');
  return html.replace(head[0], () => clean.replace(/<\/head\s*>/i, () => `${metadata}\n</head>`));
}

async function validateOutput(output, plannedFiles) {
  await rejectSymlinkPath(output);
  const directories = new Set();
  for (const filename of plannedFiles) {
    let directory = path.posix.dirname(filename);
    while (directory !== '.') {
      directories.add(directory);
      directory = path.posix.dirname(directory);
    }
  }
  const stat = await statIfExists(output);
  if (!stat) return;
  if (!stat.isDirectory()) throw new Error('The output path is not a directory.');
  async function inspect(directory, relative = '') {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const name = relative ? `${relative}/${entry.name}` : entry.name;
      const absolute = path.join(directory, entry.name);
      const item = await lstat(absolute);
      if (item.isSymbolicLink()) throw new Error(`Output contains a symbolic link: ${name}`);
      if (item.isDirectory() && directories.has(name)) await inspect(absolute, name);
      else if (!item.isFile() || !plannedFiles.has(name) || item.nlink > 1) {
        throw new Error(`Output contains an unexpected file, directory, or hard link: ${name}. Choose a new empty output directory; nothing was deleted.`);
      }
    }
  }
  await inspect(output);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options) { console.log(usage); return; }
  const { base, output } = options;
  await rejectSymlinkPath(sourceRoot);
  const files = [...pages, ...fixedAssets, ...await collectImages()];
  if (!files.includes('images/logo.png')) throw new Error('The sharing image images/logo.png is missing.');
  const planned = new Map();
  // Read and validate all inputs before touching the output directory.
  for (const filename of files) {
    const source = path.join(sourceRoot, filename);
    await rejectSymlinkPath(source);
    if (!(await lstat(source)).isFile()) throw new Error(`Expected a regular source file: ${filename}`);
    const contents = await readFile(source);
    planned.set(filename, pages.includes(filename) ? withMetadata(contents.toString('utf8'), filename, base) : contents);
  }
  const urls = pages.map(filename => new URL(filename === 'index.html' ? './' : filename, base).href);
  planned.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${escapeMarkup(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
  planned.set('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', base).href}\n`);
  await validateOutput(output, new Set(planned.keys()));
  await mkdir(output, { recursive: true });
  for (const [filename, contents] of planned) {
    const destination = path.join(output, filename);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, contents);
  }
  console.log(`Prepared ${planned.size} public files for ${base.href}`);
  console.log(`Output: ${output}`);
  console.log('Source files were not changed. No files were uploaded.');
}

main().catch(error => {
  console.error(`Preparation failed: ${error.message}`);
  process.exitCode = 1;
});
