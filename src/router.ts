import { useEffect, useSyncExternalStore } from 'react';
import type { Project } from './data/projects';
import type { ResearchNote } from './data/research';
import { OG_IMAGE_PATH, researchStructuredData, SITE_NAME, structuredData, type PageMeta } from './data/seo';

/**
 * A tiny History API router. The site has a small set of pages, so a full
 * routing library would cost more bundle than it saves.
 */

export type Route =
  | { name: 'home' }
  | { name: 'projects' }
  | { name: 'project'; slug: string }
  | { name: 'research-index' }
  | { name: 'research'; slug: string }
  | { name: 'not-found' };

type PendingScroll = { hash: string } | 'top' | null;

const listeners = new Set<() => void>();
let pendingScroll: PendingScroll = window.location.hash.length > 1 ? { hash: window.location.hash.slice(1) } : null;

function normalize(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}

export function matchRoute(pathname: string): Route {
  const path = normalize(pathname);
  if (path === '/') return { name: 'home' };
  if (path === '/projects') return { name: 'projects' };
  if (path === '/research') return { name: 'research-index' };
  const project = /^\/projects\/([a-z0-9-]+)$/.exec(path);
  if (project) return { name: 'project', slug: project[1] };
  const research = /^\/research\/([a-z0-9-]+)$/.exec(path);
  if (research) return { name: 'research', slug: research[1] };
  return { name: 'not-found' };
}

function subscribe(listener: () => void) {
  const onPopState = () => {
    // Back and forward keep the browser's own scroll position.
    pendingScroll = null;
    listener();
  };
  listeners.add(listener);
  window.addEventListener('popstate', onPopState);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('popstate', onPopState);
  };
}

export function usePathname() {
  return useSyncExternalStore(subscribe, () => normalize(window.location.pathname), () => '/');
}

function scrollToHash(hash: string, attempts = 40) {
  const target = document.getElementById(decodeURIComponent(hash));
  if (!target) {
    // Lazy sections may not have rendered yet.
    if (attempts > 0) window.setTimeout(() => scrollToHash(hash, attempts - 1), 50);
    return;
  }
  target.scrollIntoView({ behavior: 'instant' });
  // Sections above the target may finish loading afterwards and push it down.
  for (const delay of [150, 500, 1200]) {
    window.setTimeout(() => {
      if (Math.abs(target.getBoundingClientRect().top - 24) > 4) target.scrollIntoView({ behavior: 'instant' });
    }, delay);
  }
}

function applyScroll(scroll: Exclude<PendingScroll, null>) {
  if (scroll === 'top') window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  else scrollToHash(scroll.hash);
}

export function navigate(to: string, options: { replace?: boolean } = {}) {
  const url = new URL(to, window.location.href);
  if (url.origin !== window.location.origin) {
    window.location.assign(url.href);
    return;
  }

  const samePath = normalize(url.pathname) === normalize(window.location.pathname);
  window.history[options.replace ? 'replaceState' : 'pushState'](null, '', url.pathname + url.search + url.hash);
  const scroll: Exclude<PendingScroll, null> = url.hash.length > 1 ? { hash: url.hash.slice(1) } : 'top';

  if (samePath) {
    applyScroll(scroll);
    return;
  }
  pendingScroll = scroll;
  listeners.forEach(listener => listener());
}

/** Scrolls and moves focus after a route change, once the new page is in place. */
export function useRouteEffects(pathname: string, meta: PageMeta, project?: Project, research?: ResearchNote) {
  const { title, description, path, noindex, ogType, imagePath, imageAlt } = meta;
  useEffect(() => {
    document.title = title;
    const set = (selector: string, attribute: string, value: string) => document.querySelector(selector)?.setAttribute(attribute, value);
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:type"]', 'content', ogType ?? 'website');
    set('meta[name="twitter:title"]', 'content', title);
    set('meta[name="twitter:description"]', 'content', description);
    set('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    // Keep the build-time production origin; only the path follows navigation.
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const url = new URL(path, canonical.href).href;
      canonical.href = url;
      set('meta[property="og:url"]', 'content', url);
    }

    // Keep structured data in sync when navigation happens without a page load.
    const site = canonical ? new URL(canonical.href).origin : window.location.origin;
    const image = new URL(imagePath ?? OG_IMAGE_PATH, site).href;
    set('meta[property="og:image"]', 'content', image);
    set('meta[property="og:image:alt"]', 'content', imageAlt ?? 'Ashish Prajapati, AI engineer and full-stack developer');
    set('meta[name="twitter:image"]', 'content', image);
    set('meta[name="twitter:image:alt"]', 'content', imageAlt ?? 'Ashish Prajapati, AI engineer and full-stack developer');
    document.head.querySelectorAll('meta[data-scholar-meta]').forEach(node => node.remove());
    if (research?.kind === 'working-paper') {
      const tags: Array<[string, string]> = [['citation_title', research.title], ['citation_author', SITE_NAME]];
      if (research.pdfUrl) tags.push(['citation_pdf_url', new URL(research.pdfUrl, site).href]);
      if (research.publishedAt) tags.push(['citation_publication_date', research.publishedAt.replace(/-/g, '/')]);
      for (const [name, content] of tags) {
        const tag = document.createElement('meta');
        tag.name = name;
        tag.content = content;
        tag.setAttribute('data-scholar-meta', '');
        document.head.appendChild(tag);
      }
    }
    const existing = document.getElementById('structured-data');
    if (noindex) {
      existing?.remove();
    } else {
      const data = research ? researchStructuredData(site, research) : structuredData(site, { title, description, path }, project);
      const script = existing ?? document.createElement('script');
      script.id = 'structured-data';
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
      if (!existing) document.head.appendChild(script);
    }
  }, [title, description, path, noindex, ogType, imagePath, imageAlt, project, research]);

  useEffect(() => {
    const scroll = pendingScroll;
    pendingScroll = null;
    if (!scroll) return;
    applyScroll(scroll);
    if (scroll === 'top') document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
}
