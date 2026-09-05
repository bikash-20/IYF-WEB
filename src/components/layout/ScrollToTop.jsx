import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSmoothScroll } from '@/lib/smoothScroll.js';

/**
 * On route change, scrolls back to top. Routes the tween through
 * the smooth-scroll engine (~480ms easeOutExpo) when it's mounted,
 * so consumers of scroll position (useScrolled, etc.) see the
 * tweening values reflect through. Falls back to native scrollTo
 * with the engine is bypassed (prefers-reduced-motion).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }

    getSmoothScroll().scrollTo(0, { duration: 480 });
    return undefined;
  }, [pathname]);
  return null;
}
