import { useEffect, useState } from 'react';
import { getSmoothScroll } from '@/lib/smoothScroll.js';

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Reads from the smooth-scroll engine when it's mounted (lerped
 * virtual position), or falls back to native `window.scrollY`
 * when the engine isn't mounted (prefers-reduced-motion bypass).
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const scroll = getSmoothScroll();
    const compute = () => setScrolled(scroll.mounted ? scroll.y > threshold : window.scrollY > threshold);
    compute();
    if (scroll.mounted) return scroll.on('scroll', compute);
    // Bypass path — engine never mounted (reduced-motion). Listen
    // to native scroll so the navbar still flips at the threshold.
    const onScroll = () => compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}