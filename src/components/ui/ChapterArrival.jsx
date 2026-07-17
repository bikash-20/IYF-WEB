import { useRef, useEffect } from 'react';
import { cn } from '@/lib/cn.js';

/**
 * ChapterArrival — opt-in wrapper for "chapter-level" arrival feel.
 *
 * Wrap the first content block of a Section with this to give the
 * whole section a single, cinematic reveal that settles the
 * reader into the chapter before the inner <Reveal> blocks
 * start staggering their detail motion.
 *
 * Why this exists as its own component (rather than baking it into
 * Section): v0.9.0 made every Section itself a data-reveal-target,
 * which broke lazy-loaded pages under <Suspense mode="wait"> — the
 * Section's opacity:0 fired before its parent <motion.div> finished
 * hydrating, and the global observer read a stale bounding rect,
 * leaving the whole page invisible. This wrapper, by contrast, lives
 * INSIDE the Section (so the section bg paints immediately and
 * graceful-degradation is clean), and is opt-in so pages that don't
 * want chapter motion don't get it.
 *
 * The wrapper uses the global `reveal curtain` rules from
 * index.css (clip-path inset 0 0 100% 0 → 0, plus 20px rise, 1100ms
 * cubic-bezier) so the chapter reads as a curtain opening rather
 * than a flat slide. It is itself a data-reveal-target — the App.jsx
 * observer flips it from "no" to "yes" when it scrolls into view.
 *
 * Usage:
 *   <Section>
 *     <Container>
 *       <ChapterArrival>
 *         <h2>...</h2>
 *         <p>...</p>
 *       </ChapterArrival>
 *       {items.map((item, i) => (
 *         <Reveal key={item.id} index={i}>
 *           <Card {...item} />
 *         </Reveal>
 *       ))}
 *     </Container>
 *   </Section>
 */
export function ChapterArrival({
  as: Tag = 'div',
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return undefined;
    const el = ref.current;
    el.setAttribute('data-reveal-target', 'yes');
    el.setAttribute('data-reveal', 'no');
    return undefined;
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('reveal curtain', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}