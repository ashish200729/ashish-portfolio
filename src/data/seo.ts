import { PROJECTS, type Project } from './projects';
import { RESEARCH_COLLECTION, RESEARCH_NOTES, getResearchNote, listResearchNotes, type ResearchNote } from './research';

/** Pure data and builders shared by the app (runtime titles) and the build (static HTML, sitemap, JSON-LD). */

export const SITE_NAME = 'Ashish Prajapati';
export const SITE_TITLE = 'Ashish Prajapati | AI Engineer & Full-Stack Developer';
export const SITE_DESCRIPTION =
  'Ashish Prajapati is an AI engineer and full-stack developer, founder of Orbit Editor and Milkey AI. He builds AI agents, developer tools, and production-ready web apps.';
export const OG_IMAGE_PATH = '/og-image.png';

export const PROFILE_LINKS = [
  'https://github.com/ashish200729',
  'https://www.linkedin.com/in/ashish-prajapati-95a77036a/',
  'https://x.com/Ashishx29',
];

const KNOWS_ABOUT = [
  'AI engineering',
  'Large language models',
  'AI agents',
  'Model Context Protocol',
  'Full-stack development',
  'TypeScript',
  'React',
  'Next.js',
  'Rust',
  'Go',
  'Python',
  'NestJS',
  'PostgreSQL',
];

export interface PageMeta {
  title: string;
  description: string;
  /** Path on the site, starting with a slash. */
  path: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  lastModified?: string;
  imagePath?: string;
  imageAlt?: string;
}

export const HOME_META: PageMeta = { title: SITE_TITLE, description: SITE_DESCRIPTION, path: '/' };

export const PROJECTS_META: PageMeta = {
  title: 'Projects | Ashish Prajapati',
  description: 'Orbit Editor, Milkey AI, Ventmark, and more: AI agents, developer tools, and full-stack products built by Ashish Prajapati.',
  path: '/projects',
};

export const RESEARCH_META: PageMeta = {
  title: `${RESEARCH_COLLECTION.title} | Ashish Prajapati`,
  description: RESEARCH_COLLECTION.description,
  path: '/research',
  imagePath: RESEARCH_COLLECTION.socialImage.src,
  imageAlt: RESEARCH_COLLECTION.socialImage.alt,
};

export const NOT_FOUND_META: PageMeta = {
  title: 'Page not found | Ashish Prajapati',
  description: SITE_DESCRIPTION,
  path: '/404',
  noindex: true,
};

export function projectMeta(project: Project): PageMeta {
  const note = project.researchSlug ? getResearchNote(project.researchSlug) : undefined;
  const image = project.socialImage ?? (note ? note.socialImage ?? RESEARCH_COLLECTION.socialImage : undefined);
  return {
    title: `${project.name} | Ashish Prajapati`,
    description: `${project.summary} Built by Ashish Prajapati.`,
    path: `/projects/${project.slug}`,
    imagePath: image?.src,
    imageAlt: image?.alt,
  };
}

export function researchMeta(note: ResearchNote): PageMeta {
  return {
    title: `${note.title} | Ashish Prajapati`,
    description: note.summary,
    path: `/research/${note.slug}`,
    ogType: 'article',
    lastModified: note.modifiedAt,
    imagePath: (note.socialImage ?? RESEARCH_COLLECTION.socialImage).src,
    imageAlt: (note.socialImage ?? RESEARCH_COLLECTION.socialImage).alt,
  };
}

/** Every indexable path that gets its own static HTML file and a sitemap entry. */
export function indexablePages(): PageMeta[] {
  return [HOME_META, PROJECTS_META, RESEARCH_META, ...PROJECTS.map(projectMeta), ...RESEARCH_NOTES.map(researchMeta)];
}

type JsonLd = Record<string, unknown>;

/** Structured data for a page. `site` is the absolute origin without a trailing slash. */
export function structuredData(site: string, page: PageMeta, project?: Project): JsonLd {
  const personId = `${site}/#person`;
  const url = `${site}${page.path === '/' ? '/' : page.path}`;

  if (page.path === '/') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${site}/#website`,
          url: `${site}/`,
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          inLanguage: 'en',
          publisher: { '@id': personId },
        },
        {
          '@type': 'Person',
          '@id': personId,
          name: SITE_NAME,
          alternateName: ['Ashish Prajapati AI Engineer', 'ashish200729', 'Ashishx29'],
          url: `${site}/`,
          image: `${site}/image.jpg`,
          jobTitle: 'AI Engineer & Full-Stack Developer',
          description: SITE_DESCRIPTION,
          knowsAbout: KNOWS_ABOUT,
          sameAs: PROFILE_LINKS,
        },
        {
          '@type': 'ProfilePage',
          '@id': `${site}/#profile`,
          url: `${site}/`,
          name: SITE_TITLE,
          mainEntity: { '@id': personId },
          isPartOf: { '@id': `${site}/#website` },
        },
      ],
    };
  }

  const isResearchIndex = page.path === '/research';
  const crumbs: Array<[string, string]> = [['Home', `${site}/`], [isResearchIndex ? 'Research & writing' : 'Projects', `${site}${isResearchIndex ? '/research' : '/projects'}`]];
  if (project) crumbs.push([project.name, url]);

  const graph: JsonLd[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })),
    },
  ];

  if (project) {
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      url,
      name: project.name,
      description: project.summary,
      abstract: project.overview,
      keywords: project.stack.join(', '),
      creator: { '@id': personId },
      sameAs: project.links.map(link => link.url).filter(link => !link.endsWith('ashish200729')),
      ...(project.socialImage ? { image: new URL(project.socialImage.src, site).href } : {}),
      ...(project.video ? { video: { '@id': `${url}#video` } } : {}),
    });
    if (project.video) {
      const { video } = project;
      graph.push({
        '@type': 'VideoObject',
        '@id': `${url}#video`,
        name: video.title,
        description: video.description,
        thumbnailUrl: new URL(video.poster, site).href,
        contentUrl: new URL(video.src, site).href,
        uploadDate: video.uploadDate,
        duration: `PT${video.seconds}S`,
        width: video.width,
        height: video.height,
        encodingFormat: 'video/mp4',
        inLanguage: 'en',
        creator: { '@id': personId },
      });
    }
  } else {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#${isResearchIndex ? 'research' : 'projects'}`,
      url,
      name: page.title,
      description: page.description,
      author: { '@id': personId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: (isResearchIndex ? listResearchNotes().map(note => ({ name: note.title, path: `/research/${note.slug}` })) : PROJECTS.map(item => ({ name: item.name, path: `/projects/${item.slug}` }))).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${site}${item.path}`,
        })),
      },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Research notes are articles with their own URL and links to their source material. */
export function researchStructuredData(site: string, note: ResearchNote): JsonLd {
  const url = `${site}/research/${note.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          ['Home', `${site}/`],
          ['Research & writing', `${site}/research`],
          [note.title, url],
        ].map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })),
      },
      {
        '@type': note.kind === 'working-paper' ? ['Article', 'ScholarlyArticle'] : 'BlogPosting',
        '@id': `${url}#article`,
        url,
        headline: note.title,
        description: note.summary,
        abstract: note.abstract.map(paragraph => paragraph.text).join(' '),
        keywords: note.keywords.join(', '),
        inLanguage: 'en',
        author: { '@type': 'Person', '@id': `${site}/#person`, name: SITE_NAME, url: `${site}/` },
        mainEntityOfPage: url,
        isAccessibleForFree: true,
        ...(note.socialImage ? { image: { '@type': 'ImageObject', url: new URL(note.socialImage.src, site).href, caption: note.socialImage.alt } } : {}),
        ...(note.projectSlug ? { about: { '@id': `${site}/projects/${note.projectSlug}#project` } } : {}),
        ...(note.pdfUrl ? { encoding: { '@type': 'MediaObject', contentUrl: new URL(note.pdfUrl, site).href, encodingFormat: 'application/pdf' } } : {}),
        ...(note.createdAt ? { dateCreated: note.createdAt } : {}),
        ...(note.modifiedAt ? { dateModified: note.modifiedAt } : {}),
        ...(note.publishedAt ? { datePublished: note.publishedAt } : {}),
        citation: note.references.map(reference => new URL(reference.url, site).href),
      },
    ],
  };
}
