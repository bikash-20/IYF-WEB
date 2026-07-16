import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Premium page-transition scroll:
 *   - On route change, scrolls back to top with a smooth but fast
 *     curve (~480ms) so the page "lifts" rather than snapping.
 *   - Honors prefers-reduced-motion by falling back to instant.
 *
 * The smooth scroll is implemented as a tween (not the native CSS
 * `scroll-behavior: smooth` on the html element) because:
 *   1. Native smooth scroll uses a fixed-duration curve that can't
 *      be tuned, and on long pages it over-shoots and bounces.
 *   2. A custom tween lets us decelerate gracefully — fast at the
 *      start, gentle settle at the end, the same cinematic curve
 *      used by reveal animations.
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

    const start = window.scrollY;
    if (start === 0) return undefined;
    const duration = 480;
    const startTime = performance.now();

    // Cinematic ease — fast at start, slow at end. Matches the reveal
    // curve (0.16, 1, 0.3, 1) so the whole page reads as one motion
    // vocabulary.
    const easeOutExpo = (t) => 1 - Math.pow(2, -10 * t);

    let raf = 0;
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      window.scrollTo({ top: start * (1 - eased), behavior: 'instant' });
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);
  return null;
}
