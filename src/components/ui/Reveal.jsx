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
  const hasSetInitialState = useRef(false);

  // এই effect শুধু ONE TIME চলবে (mount-এ) — data-reveal attribute সেট করার জন্য।
  // delay বদলালে এটা আর re-run হবে না, তাই visibility state কখনো regress করবে না।
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    if (hasSetInitialState.current) return;
    const el = ref.current;
    el.setAttribute('data-reveal-target', 'yes');
    el.setAttribute('data-reveal', 'no');
    hasSetInitialState.current = true;
  }, []); // ← delay সরিয়ে দিলাম dependency থেকে

  // delay বদলালে শুধু transitionDelay আপডেট হবে, data-reveal attribute অক্ষত থাকবে
  useEffect(() => {
    if (!ref.current) return;
    if (delay) ref.current.style.transitionDelay = `${delay}s`;
  }, [delay]);

  return (
    <Tag ref={ref} className={cn('reveal', className)} style={rest.style} {...rest}>
      {children}
    </Tag>
  );
}