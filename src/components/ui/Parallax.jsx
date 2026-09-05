import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn.js';

/**
 * Parallax — a thin scroll-parallax wrapper.
 *
 * Wraps any element (image, decorative SVG, radial light, etc.) and
 * translates it along a single axis based on the wrapper's own
 * position in the viewport. Mirrors the pattern used in `Hero.jsx`
 * (smoothstep-eased `useScroll` + `useTransform`) but condensed to
 * one prop, so callers can opt in without copy-pasting the boilerplate.
 *
 * Why a wrapper, not a hook? Most use-cases are "translate this
 * decorative layer a little while the user scrolls past it" — a
 * JSX wrapper is the lower-friction API for that, and avoids forcing
 * every consumer to wire their own `useRef` + `useScroll` pair.
 *
 * Behaviour:
 *   - `speed` ∈ roughly [-0.4, 0.4]. The element drifts up to ±80 px
 *     on Y (or ±40 px on X) over its full viewport traversal. The
 *     Hero uses up to ±48 px on its foreground photo; this gives a
 *     touch more headroom for far-background layers.
 *     Positive speed = drifts down as the user scrolls down (typical
 *     background behaviour). Negative = opposite direction (foreground
 *     / "rises into view").
 *   - The wrapper observes itself (`offset: ['start end', 'end start']`)
 *     so the element only moves while it's near the viewport. Layers
 *     fully above or below stay at rest — no wasted animation.
 *   - The curve is smoothstep (`t * t * (3 - 2t)`), the same shape the
 *     Hero uses for its photo scroll, so parallax across the page
 *     reads with one consistent organic feel.
 *   - Honours `prefers-reduced-motion` via Framer Motion's
 *     `useReducedMotion()` (the site already wraps in
 *     `<MotionConfig reducedMotion="user">`, but we double-gate here
 *     for safety and to match the Hero's `useReducedMotion` usage).
 *
 * Examples:
 *   // Subtle background drift
 *   <Parallax speed={0.15}>
 *     <div className="absolute inset-0 ..." />
 *   </Parallax>
 *
 *   // Foreground image rising
 *   <Parallax speed={-0.08}>
 *     <EditorialImage ... />
 *   </Parallax>
 *
 *   // Horizontal parallax
 *   <Parallax speed={0.08} axis="x">
 *     <DecorativeSvg />
 *   </Parallax>
 */
const MAX_Y_PX = 80;
const MAX_X_PX = 40;

export function Parallax({
  speed = 0.15,
  axis = 'y',
  className,
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // 'start end' → element top hits viewport bottom (just appeared)
    // 'end start' → element bottom hits viewport top (about to leave)
    // Progress goes 0 → 1 as the element travels UP through the
    // viewport (because the user is scrolling down).
    offset: ['start end', 'end start'],
  });

  // For background-like behaviour (speed > 0): the element should
  // drift DOWN as the user scrolls down — i.e., lag behind the
  // page. We map progress [0,1] → [-speed, +speed] * magnitude and
  // smoothstep it so motion eases in/out at the section's edges.
  // Negative speed flips the sign so the layer rises into view
  // (foreground / "approaching").
  const smooth = (t) => t * t * (3 - 2 * t); // same curve as Hero.jsx
  const magnitude = axis === 'x' ? MAX_X_PX : MAX_Y_PX;
  const offset = useTransform(scrollYProgress, (p) => {
    const eased = smooth(p); // 0 → 1 with smoothstep
    return (eased - 0.5) * 2 * speed * magnitude; // [-speed, +speed] * mag
  });

  const transformProp = axis === 'x' ? { x: offset } : { y: offset };

  if (prefersReduced) {
    // Static fallback — children render in place, no transform.
    return (
      <div ref={ref} className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ ...transformProp, ...style }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
