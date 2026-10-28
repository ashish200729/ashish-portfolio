import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/** True when the visitor has asked the system for less motion. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribeToMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => true);
}

/**
 * True while the element is on screen. With `once`, it stays true after the first appearance,
 * which suits entrance animations; without it, callers can pause work while off screen.
 */
export function useInView(ref: RefObject<Element | null>, { once = false, threshold = 0.25 } = {}) {
  // Without IntersectionObserver, treat the element as always visible.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && once) observer.disconnect();
    }, { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, once, threshold]);

  return inView;
}
