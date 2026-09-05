import { useEffect } from 'react';
import { getSmoothScroll } from '@/lib/smoothScroll.js';

/**
 * Mounts the singleton smooth-scroll engine on mount and tears it
 * down on unmount. When `prefers-reduced-motion: reduce` is set at
 * mount, `start()` is a no-op and the engine never mounts — native
 * browser scrolling takes over.
 */
export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const scroll = getSmoothScroll();
    scroll.start();
    return () => scroll.destroy();
  }, []);
  return children;
}
