import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { PROJECTS, getProject } from '../src/data/projects';
import {
  HOME_META, NOT_FOUND_META, PROJECTS_META, SITE_NAME, indexablePages, projectMeta, structuredData,
  type PageMeta,
} from '../src/data/seo';

const PLACEHOLDER = '__SITE_URL__';
const DEFAULT_SITE = 'https://ashish-portfolio-livid.vercel.app';

/** SITE_URL wins, then Vercel's production domain, then the known deployment. */
function resolveSite() {
  const explicit = process.env.SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : DEFAULT_SITE);
  return explicit.replace(/\/+$/, '');
}

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonLdScript = (data: unknown) =>
  `<script type="application/ld+json" id="structured-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

function setMeta(html: string, attribute: 'name' | 'property', key: string, value: string) {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`SEO: <meta ${attribute}="${key}"> missing from index.html`);
  return html.replace(pattern, (_, start: string, end: string) => `${start}${escapeHtml(value)}${end}`);
}

/** Rewrites the per-page tags of the built home page for another route. */
function renderPage(template: string, site: string, page: PageMeta, fallbackHtml: string, jsonLd?: unknown) {
  const url = `${site}${page.path}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/, jsonLd ? jsonLdScript(jsonLd) : '');
  html = html.replace(/<noscript id="seo-fallback">[\s\S]*?<\/noscript>/, `<noscript id="seo-fallback">${fallbackHtml}</noscript>`);
  return html;
}

function projectFallback(slug: string) {
  const project = getProject(slug);
  if (!project) return '';
  const links = project.links.map(link => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a></li>`).join('');
  return `<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui;line-height:1.8">
<p><a href="/projects">All projects</a> · <a href="/">${SITE_NAME}</a></p>
<h1>${escapeHtml(project.name)}</h1><p>${escapeHtml(project.summary)}</p>
<p>${escapeHtml(project.role)} · ${escapeHtml(project.period)} · ${escapeHtml(project.status)}</p>
<p>${escapeHtml(project.overview)}</p>${project.highlights.length ? `<ul>${project.highlights.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
<p>${escapeHtml(project.stack.join(' · '))}</p>${links ? `<ul>${links}</ul>` : ''}</main>`;
}

function projectsFallback() {
  const items = PROJECTS.map(project => `<li><a href="/projects/${project.slug}">${escapeHtml(project.name)}</a>: ${escapeHtml(project.summary)}</li>`).join('');
  return `<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui;line-height:1.8">
<p><a href="/">${SITE_NAME}</a></p><h1>Projects by ${SITE_NAME}</h1><ul>${items}</ul></main>`;
}

export function homeFallback() {
  const items = PROJECTS.filter(project => project.featured).map(project => `<li><a href="/projects/${project.slug}">${escapeHtml(project.name)}</a>: ${escapeHtml(project.summary)}</li>`).join('');
  return `<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui;line-height:1.8">
<h1>${SITE_NAME} — AI engineer &amp; full-stack developer</h1>
<p>${escapeHtml(HOME_META.description)}</p><ul>${items}</ul>
<p><a href="/projects">All projects</a> · <a href="/Ashish_Prajapati_Resume.pdf">Résumé</a> · <a href="mailto:ashishp.292007@gmail.com">Get in touch</a></p></main>`;
}

export default function seo(): Plugin {
  const site = resolveSite();
  let outDir = 'dist';
  let root = process.cwd();

  return {
    name: 'portfolio-seo',
    configResolved(config) {
      outDir = config.build.outDir;
      root = config.root;
    },
    transformIndexHtml(html) {
      let out = html.split(PLACEHOLDER).join(site);
      out = out.replace(/<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/, jsonLdScript(structuredData(site, HOME_META)));
      out = out.replace(/<noscript id="seo-fallback">[\s\S]*?<\/noscript>/, `<noscript id="seo-fallback">${homeFallback()}</noscript>`);
      const verification = process.env.GOOGLE_SITE_VERIFICATION;
      if (verification) out = out.replace('</head>', `    <meta name="google-site-verification" content="${escapeHtml(verification)}" />\n  </head>`);
      return out;
    },
    closeBundle() {
      const dist = path.resolve(root, outDir);
      const indexPath = path.join(dist, 'index.html');
      if (!fs.existsSync(indexPath)) return; // dev server or a build that emitted no HTML
      const template = fs.readFileSync(indexPath, 'utf8');
      const write = (relative: string, content: string) => {
        const target = path.join(dist, relative);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, content);
      };

      write('projects/index.html', renderPage(template, site, PROJECTS_META, projectsFallback(), structuredData(site, PROJECTS_META)));
      for (const project of PROJECTS) {
        const meta = projectMeta(project);
        write(`projects/${project.slug}/index.html`, renderPage(template, site, meta, projectFallback(project.slug), structuredData(site, meta, project)));
      }
      // Served with a real 404 status for any path that does not exist.
      write('404.html', renderPage(template, site, NOT_FOUND_META, '<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui"><h1>Page not found</h1><p><a href="/">Go to the home page</a></p></main>'));

      const today = new Date().toISOString().slice(0, 10);
      const entries = indexablePages().map(page => {
        const priority = page.path === '/' ? '1.0' : page.path === '/projects' ? '0.8' : '0.6';
        return `  <url>\n    <loc>${site}${page.path === '/' ? '/' : page.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
      });
      write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`);
      write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`);
    },
  };
}

