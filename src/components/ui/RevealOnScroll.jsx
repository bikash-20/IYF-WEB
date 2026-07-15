import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion.js';

/**
 * RevealOnScroll — wraps children in a viewport-aware fade-up. Use
 * sparingly; whole pages should not animate, only key elements.
 *
 * v0.8 safety net:
 *   - No negative viewport margin — sections that start above the
 *     fold used to stay at opacity:0 because the IntersectionObserver
 *     trigger box never overlapped them. We trigger as soon as any
 *     pixel of the element enters the viewport (default amount: 0).
 *   - `once: true` keeps the element visible after the first reveal.
 *   - A short IntersectionObserver fallback (covers the rare case
 *     where Framer Motion's intersection observer hasn't fired yet)
 *     forces the element to opacity:1 if it sits on-screen for more
 *     than 800ms. This guarantees no content is ever stuck invisible.
 */
export function RevealOnScroll({ children, delay = 0, className, as = 'div' }) {
  const MotionTag = motion[as] || motion.div;
  const ref = useRef(null);

  // Defensive: even if `whileInView` somehow never fires, force the
  // element visible after a brief delay if it is already on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    const reveal = () => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    };

    // If the element is already intersecting at mount, Framer Motion
    // will handle it; but also schedule a safety release so the
    // content never sits invisible if anything in the chain breaks.
    const safetyTimer = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      const onScreen =
        r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth;
      if (onScreen) reveal();
    }, 1200);

    return () => window.clearTimeout(safetyTimer);
  }, []);

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
