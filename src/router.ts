import { useEffect, useSyncExternalStore } from 'react';

/**
 * A tiny History API router. The site has three kinds of page, so a full
 * routing library would cost more bundle than it saves.
 */

export type Route =
  | { name: 'home' }
  | { name: 'projects' }
  | { name: 'project'; slug: string }
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
  const project = /^\/projects\/([a-z0-9-]+)$/.exec(path);
  if (project) return { name: 'project', slug: project[1] };
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
export function useRouteEffects(pathname: string, title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [title, description]);

  useEffect(() => {
    const scroll = pendingScroll;
    pendingScroll = null;
    if (!scroll) return;
    applyScroll(scroll);
    if (scroll === 'top') document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
}
