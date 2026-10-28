import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { EXPERIENCE } from '../src/data/experience';
import { PROJECTS, getProject, type Project } from '../src/data/projects';
import { RESEARCH_COLLECTION, RESEARCH_NOTES, getResearchNote, listResearchNotes, validateResearchNotes, type ResearchNote, type ResearchParagraph } from '../src/data/research';
import {
  HOME_META, NOT_FOUND_META, OG_IMAGE_PATH, PROJECTS_META, RESEARCH_META, SITE_NAME, indexablePages, projectMeta, researchMeta, researchStructuredData, structuredData,
  type PageMeta,
} from '../src/data/seo';

const PLACEHOLDER = '__SITE_URL__';
const DEFAULT_SITE = 'https://www.ashishprajapati.me';

/** SITE_URL wins, then Vercel's production domain, then the known deployment. */
function resolveSite() {
  const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const explicit = process.env.SITE_URL?.trim() || (productionDomain ? `https://${productionDomain}` : DEFAULT_SITE);
  const url = new URL(explicit);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be an HTTP(S) origin without a path, query, or credentials.');
  }
  return url.origin;
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
  html = setMeta(html, 'property', 'og:type', page.ogType ?? 'website');
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:image', new URL(page.imagePath ?? OG_IMAGE_PATH, site).href);
  html = setMeta(html, 'property', 'og:image:alt', page.imageAlt ?? 'Ashish Prajapati, AI engineer and full-stack developer');
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', new URL(page.imagePath ?? OG_IMAGE_PATH, site).href);
  html = setMeta(html, 'name', 'twitter:image:alt', page.imageAlt ?? 'Ashish Prajapati, AI engineer and full-stack developer');
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/, jsonLd ? jsonLdScript(jsonLd) : '');
  html = html.replace(/<noscript id="seo-fallback">[\s\S]*?<\/noscript>/, `<noscript id="seo-fallback">${fallbackHtml}</noscript>`);
  return html;
}

function projectFallback(slug: string) {
  const project = getProject(slug);
  if (!project) return '';
  const note = project.researchSlug ? getResearchNote(project.researchSlug) : undefined;
  const research = note ? `<li><a href="/research/${escapeHtml(note.slug)}">${note.kind === 'working-paper' ? 'Read the working paper' : 'Read the article'}</a></li>` : '';
  const links = research + project.links.map(link => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a></li>`).join('');
  const video = project.video ? `<figure><video controls preload="none" poster="${escapeHtml(project.video.poster)}" width="${project.video.width}" height="${project.video.height}" style="width:100%;height:auto" aria-label="${escapeHtml(project.video.title)}" src="${escapeHtml(project.video.src)}"><a href="${escapeHtml(project.video.src)}">Download the ${escapeHtml(project.video.title)} (MP4)</a></video><figcaption>${escapeHtml(project.video.description)}</figcaption></figure>` : '';
  return `<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui;line-height:1.8">
<p><a href="/projects">All projects</a> · <a href="/">${SITE_NAME}</a></p>
<h1>${escapeHtml(project.name)}</h1><p>${escapeHtml(project.summary)}</p>
<p>${escapeHtml(project.role)} · ${escapeHtml(project.period)} · ${escapeHtml(project.status)}</p>${video}
<p>${escapeHtml(project.overview)}</p>${project.highlights.length ? `<ul>${project.highlights.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
<p>${escapeHtml(project.stack.join(' · '))}</p>${links ? `<ul>${links}</ul>` : ''}</main>`;
}

function citationFallback(note: ResearchNote, ids: string[] = []) {
  return ids.map(id => {
    const index = note.references.findIndex(reference => reference.id === id);
    return ` <a href="#ref-${escapeHtml(id)}">[${index + 1}]</a>`;
  }).join('');
}

function paragraphsFallback(note: ResearchNote, paragraphs: ResearchParagraph[]) {
  return paragraphs.map(paragraph => `<p>${escapeHtml(paragraph.text)}${citationFallback(note, paragraph.citations)}</p>`).join('');
}

function researchFallback(note: ResearchNote) {
  const samples = note.samples ? `<section id="samples"><h2>Listen to the same line</h2><p>${escapeHtml(note.samples.description)}</p><blockquote>${escapeHtml(note.samples.text)}</blockquote><ul>${note.samples.items.map(sample => `<li>${escapeHtml(sample.label)}<br><audio controls preload="metadata" aria-label="${escapeHtml(sample.label)} speech example" src="${escapeHtml(sample.src)}"><a href="${escapeHtml(sample.src)}">Download ${escapeHtml(sample.label)} audio</a></audio></li>`).join('')}</ul><p>${escapeHtml(note.samples.note)}</p></section>` : '';
  const sections = note.sections.map(section => {
    const figure = section.comparison;
    const rows = figure?.rows.map(row => `<tr><th scope="row">${escapeHtml(row.tone)}</th><td>${row.base.toFixed(6)}</td><td>${row.matched.toFixed(6)}</td><td>${row.swapped.toFixed(6)}</td></tr>`).join('') ?? '';
    const table = figure ? `<figure><figcaption>${escapeHtml(figure.title)}</figcaption><p>${escapeHtml(figure.description)}</p><table><thead><tr><th scope="col">Tone</th><th scope="col">Base</th><th scope="col">Matched</th><th scope="col">Swapped</th></tr></thead><tbody>${rows}</tbody></table><p>${escapeHtml(figure.note)}</p></figure>` : '';
    return `<section id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.title)}</h2>${paragraphsFallback(note, section.paragraphs)}${table}</section>`;
  }).join('');
  const references = note.references.map(reference => `<li id="ref-${escapeHtml(reference.id)}"><a href="${escapeHtml(reference.url)}">${escapeHtml(reference.label)}</a></li>`).join('');
  const records = (note.records ?? []).map(link => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a></li>`).join('');
  const attribution = note.samples ? `<p>${escapeHtml(note.samples.attribution)}${citationFallback(note, note.samples.attributionCitations)}</p>` : '';
  const project = note.projectSlug ? ` · <a href="/projects/${escapeHtml(note.projectSlug)}">Project overview</a>` : '';
  const pdf = note.pdfUrl ? `<p><a href="${escapeHtml(note.pdfUrl)}" download>Download the paper (PDF)</a></p>` : '';
  return `<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui;line-height:1.8">
<p><a href="/research">Research &amp; writing</a>${project}</p>
<article><h1>${escapeHtml(note.title)}</h1><p>${escapeHtml(note.summary)}</p><p class="citation_author">By ${SITE_NAME}</p><p>${escapeHtml(note.date)} · ${note.kind === 'working-paper' ? 'Independent working paper' : 'Article'}</p>${pdf}
<section id="abstract"><h2>${note.kind === 'working-paper' ? 'Abstract' : 'Overview'}</h2>${paragraphsFallback(note, note.abstract)}</section>
${samples}${sections}${references ? `<section id="references"><h2>References</h2>${attribution}<ol>${references}</ol></section>` : ''}${records ? `<section id="records"><h2>Experiment records</h2><ul>${records}</ul></section>` : ''}</article></main>`;
}

function scholarMetadata(note: ResearchNote, site: string) {
  if (note.kind !== 'working-paper') return '';
  const tags: Array<[string, string]> = [['citation_title', note.title], ['citation_author', SITE_NAME]];
  if (note.pdfUrl) tags.push(['citation_pdf_url', new URL(note.pdfUrl, site).href]);
  if (note.publishedAt) tags.push(['citation_publication_date', note.publishedAt.replace(/-/g, '/')]);
  return tags.map(([name, content]) => `<meta name="${name}" content="${escapeHtml(content)}" data-scholar-meta>`).join('\n');
}

function researchIndexFallback() {
  const notes = listResearchNotes();
  const items = notes.map(note => `<li><a href="/research/${escapeHtml(note.slug)}">${escapeHtml(note.title)}</a><p>${escapeHtml(note.summary)}</p><p>${note.kind === 'working-paper' ? 'Working paper' : 'Article'} · ${escapeHtml(note.date)}</p></li>`).join('');
  return `<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui;line-height:1.8"><p><a href="/">Home</a></p><h1>${escapeHtml(RESEARCH_COLLECTION.title)}</h1><p>${escapeHtml(RESEARCH_COLLECTION.intro)}</p>${items ? `<ul>${items}</ul>` : '<p>No writing has been published here yet.</p>'}</main>`;
}

function projectsFallback() {
  const items = PROJECTS.map(project => `<li><a href="/projects/${project.slug}">${escapeHtml(project.name)}</a>: ${escapeHtml(project.summary)}</li>`).join('');
  return `<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui;line-height:1.8">
<p><a href="/">${SITE_NAME}</a></p><h1>Projects by ${SITE_NAME}</h1><ul>${items}</ul></main>`;
}

export function homeFallback() {
  const items = PROJECTS.filter(project => project.featured).map(project => `<li><a href="/projects/${project.slug}">${escapeHtml(project.name)}</a>: ${escapeHtml(project.summary)}</li>`).join('');
  const experience = EXPERIENCE.map(item => {
    const company = item.confidential ? 'Company name withheld' : item.company;
    const label = `${company} — ${item.role} · ${item.period}`;
    const destination = item.confidential ? undefined : item.to ?? item.website;
    return `<li>${destination ? `<a href="${escapeHtml(destination)}">${escapeHtml(label)}</a>` : escapeHtml(label)}</li>`;
  }).join('');
  const notes = listResearchNotes().slice(0, 3).map(note => `<li><a href="/research/${escapeHtml(note.slug)}">${escapeHtml(note.title)}</a> · ${escapeHtml(note.date)}</li>`).join('');
  const research = notes ? `<section><h2>${escapeHtml(RESEARCH_COLLECTION.title)}</h2><ul>${notes}</ul><p><a href="/research">All writing</a></p></section>` : '';
  return `<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui;line-height:1.8">
<h1>${SITE_NAME} — AI engineer &amp; full-stack developer</h1>
<p>${escapeHtml(HOME_META.description)}</p><section><h2>Highlights</h2><ul>${items}</ul><h2>Experience</h2><ul>${experience}</ul></section>${research}
<p><a href="/projects">All projects</a> · <a href="/research">Research &amp; writing</a> · <a href="/Ashish_Prajapati_Resume.pdf">Résumé</a> · <a href="mailto:ashishp.292007@gmail.com">Get in touch</a></p></main>`;
}

function validateSocialImage(root: string, url: string, label = 'Research') {
  const publicDir = path.resolve(root, 'public');
  const file = path.resolve(publicDir, url.slice(1));
  if (!url.startsWith('/assets/') || !url.endsWith('.png') || !file.startsWith(`${publicDir}${path.sep}`) || !fs.existsSync(file)) throw new Error(`Missing ${label.toLowerCase()} social image: ${url}`);
  const bytes = fs.readFileSync(file);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(signature) || bytes.toString('ascii', 12, 16) !== 'IHDR' || bytes.readUInt32BE(16) !== 1200 || bytes.readUInt32BE(20) !== 630) {
    throw new Error(`${label} social image must be a 1200×630 PNG: ${url}`);
  }
}

/** A project film must be a local MP4 with a local JPEG poster, both under `public/assets/projects/`. */
function validateProjectVideo(root: string, project: Project) {
  const { video } = project;
  if (!video) return;
  const publicDir = path.resolve(root, 'public');
  for (const [url, extension] of [[video.src, '.mp4'], [video.poster, '.jpg']] as const) {
    const file = path.resolve(publicDir, url.slice(1));
    if (!url.startsWith('/assets/projects/') || !url.endsWith(extension) || !file.startsWith(`${publicDir}${path.sep}`) || !fs.existsSync(file)) {
      throw new Error(`Missing project video asset for ${project.slug}: ${url}`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(video.uploadDate) || !Number.isInteger(video.seconds) || video.seconds <= 0) {
    throw new Error(`Project video for ${project.slug} needs a YYYY-MM-DD uploadDate and a whole number of seconds.`);
  }
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
      validateResearchNotes(RESEARCH_NOTES);
      validateSocialImage(root, RESEARCH_COLLECTION.socialImage.src);
      for (const project of PROJECTS) {
        if (project.researchSlug && !getResearchNote(project.researchSlug)) throw new Error(`Missing research note for project: ${project.slug}`);
        if (project.socialImage) validateSocialImage(root, project.socialImage.src, 'Project');
        validateProjectVideo(root, project);
      }
      for (const note of RESEARCH_NOTES) {
        if (note.socialImage) validateSocialImage(root, note.socialImage.src);
        if (note.projectSlug && !getProject(note.projectSlug)) throw new Error(`Missing project for research note: ${note.slug}`);
        const publicDir = path.resolve(root, 'public');
        const localLinks = [...(note.samples?.items.map(sample => sample.src) ?? []), ...note.references.map(reference => reference.url), ...(note.records ?? []).map(record => record.url), ...(note.pdfUrl ? [note.pdfUrl] : []), ...(note.socialImage ? [note.socialImage.src] : [])].filter(url => url.startsWith('/assets/') || url === note.pdfUrl);
        for (const url of localLinks) {
          const asset = path.resolve(publicDir, url.slice(1));
          if (!asset.startsWith(`${publicDir}${path.sep}`) || !fs.existsSync(asset)) throw new Error(`Missing research asset: ${url}`);
        }
      }
      const template = fs.readFileSync(indexPath, 'utf8');
      const write = (relative: string, content: string) => {
        const target = path.join(dist, relative);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, content);
      };

      write('projects/index.html', renderPage(template, site, PROJECTS_META, projectsFallback(), structuredData(site, PROJECTS_META)));
      write('research/index.html', renderPage(template, site, RESEARCH_META, researchIndexFallback(), structuredData(site, RESEARCH_META)));
      for (const project of PROJECTS) {
        const meta = projectMeta(project);
        write(`projects/${project.slug}/index.html`, renderPage(template, site, meta, projectFallback(project.slug), structuredData(site, meta, project)));
      }
      for (const note of RESEARCH_NOTES) {
        const meta = researchMeta(note);
        const html = renderPage(template, site, meta, researchFallback(note), researchStructuredData(site, note));
        write(`research/${note.slug}/index.html`, html.replace('</head>', `${scholarMetadata(note, site)}\n  </head>`));
      }
      // Served with a real 404 status for any path that does not exist.
      write('404.html', renderPage(template, site, NOT_FOUND_META, '<main style="max-width:560px;margin:72px auto;padding:24px;font-family:system-ui"><h1>Page not found</h1><p><a href="/">Go to the home page</a></p></main>'));

      const entries = indexablePages().map(page => {
        const priority = page.path === '/' ? '1.0' : page.path === '/projects' ? '0.8' : '0.6';
        const lastModified = page.lastModified ? `\n    <lastmod>${escapeHtml(page.lastModified)}</lastmod>` : '';
        return `  <url>\n    <loc>${escapeHtml(site + (page.path === '/' ? '/' : page.path))}</loc>${lastModified}\n    <priority>${priority}</priority>\n  </url>`;
      });
      write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`);
      write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`);
    },
  };
}

