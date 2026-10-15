import { PROJECTS, type Project } from './projects';

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
}

export const HOME_META: PageMeta = { title: SITE_TITLE, description: SITE_DESCRIPTION, path: '/' };

export const PROJECTS_META: PageMeta = {
  title: 'Projects | Ashish Prajapati',
  description: 'Orbit Editor, Milkey AI, AgentUI, and more: AI agents, developer tools, and full-stack products built by Ashish Prajapati.',
  path: '/projects',
};

export const NOT_FOUND_META: PageMeta = {
  title: 'Page not found | Ashish Prajapati',
  description: SITE_DESCRIPTION,
  path: '/404',
  noindex: true,
};

export function projectMeta(project: Project): PageMeta {
  return {
    title: `${project.name} | Ashish Prajapati`,
    description: `${project.summary} Built by Ashish Prajapati.`,
    path: `/projects/${project.slug}`,
  };
}

/** Every indexable path that gets its own static HTML file and a sitemap entry. */
export function indexablePages(): PageMeta[] {
  return [HOME_META, PROJECTS_META, ...PROJECTS.map(projectMeta)];
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

  const crumbs: Array<[string, string]> = [['Home', `${site}/`], ['Projects', `${site}/projects`]];
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
    });
  } else {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#projects`,
      url,
      name: page.title,
      description: page.description,
      author: { '@id': personId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PROJECTS.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${site}/projects/${item.slug}`,
        })),
      },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
