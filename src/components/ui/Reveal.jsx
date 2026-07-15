import { useRef, useEffect } from 'react';
import { cn } from '@/lib/cn.js';

/**
 * Reveal — single-element CSS fade-up reveal.
 *
 * Sister to RevealOnScroll but for elements that aren't wrapped in
 * the page-level observer yet, or that need a custom selector.
 * Used inside `RevealGroup` for child elements.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const el = ref.current;
    el.setAttribute('data-reveal-target', 'yes');
    el.setAttribute('data-reveal', 'no');
    if (delay) el.style.transitionDelay = `${delay}s`;
  }, [delay]);

  return (
    <Tag ref={ref} className={cn('reveal', className)} style={rest.style} {...rest}>
      {children}
    </Tag>
  );
}