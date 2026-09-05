import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { getSmoothScroll } from '@/lib/smoothScroll.js';
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
 *   - **Smooth-scroll engine integration.** When the engine is mounted,
 *     `momentum` (the lerped residual between target and current scroll
 *     position) is fed into the offset so a heavy flick overshoots the
 *     layer a few pixels past its normal position before it settles.
 *     That's the visual callback for "the page is still gliding" —
 *     without it the parallax would feel mechanical next to the heavy
 *     main scroll. When the engine isn't mounted (reduced-motion
 *     bypass), momentum stays at 0 and the parallax reads from
 *     scrollYProgress alone — identical to the previous behaviour.
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

  // Momentum — a MotionValue that mirrors the smooth-scroll engine's
  // current velocity in px/frame. We use a MotionValue (not React
  // state) so updates bypass React's render cycle: the engine
  // publishes velocity up to ~60 times/second while the page is
  // gliding, and we don't want 60 renders/second per Parallax.
  //
  // The subscription is module-scoped so a single engine listener
  // fans out to every mounted Parallax's MotionValue. See
  // useMomentumSubscription below.
  const momentum = useMotionValue(0);
  useMomentumSubscription(momentum);

  // For background-like behaviour (speed > 0): the element drifts
  // DOWN as the user scrolls down — i.e., lags behind the page.
  // We map progress [0,1] → [-speed, +speed] * magnitude, smoothstep
  // it, then add a small momentum nudge.
  //
  // The momentum contribution is signed by `speed` so backgrounds
  // (positive speed) glide a touch more downward when the page is
  // still moving downward, and foregrounds (negative speed) rise a
  // touch more. Cap the multiplier at 0.5 so a violent flick never
  // produces more than ~½ a layer-width of overshoot.
  const smooth = (t) => t * t * (3 - 2 * t);
  const magnitude = axis === 'x' ? MAX_X_PX : MAX_Y_PX;
  const offset = useTransform([scrollYProgress, momentum], ([p, m]) => {
    const eased = smooth(p);
    const base = (eased - 0.5) * 2 * speed * magnitude;
    // m is px/frame; multiply by a constant to translate "engine
    // velocity in px/frame" into "extra parallax offset in px". 0.5
    // is tuned so a 6 px/frame flick adds ~3 px of parallax nudge.
    const nudge = m * 0.5 * speed;
    return base + nudge;
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

// ----- Momentum subscription ---------------------------------------------
//
// The engine publishes `momentum` up to ~60 times/second while the
// page is gliding. We don't want N Parallax components × 60 renders,
// so we keep ONE engine listener active and fan out to every mounted
// Parallax's MotionValue. The first mount starts the listener; the
// last unmount stops it.

let momentumSubscribers = 0;
const momentumMotionValues = new Set();
let momentumUnsubscribe = null;
const MOMENTUM_CAP_PX = 6; // ±6 px/frame — keeps nudges subtle

function useMomentumSubscription(motionValue) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const scroll = getSmoothScroll();
    momentumMotionValues.add(motionValue);
    momentumSubscribers++;
    if (momentumSubscribers === 1) {
      momentumUnsubscribe = scroll.on('momentum', (v) => {
        const capped = Math.max(-MOMENTUM_CAP_PX, Math.min(MOMENTUM_CAP_PX, v));
        for (const mv of momentumMotionValues) {
          mv.set(capped);
        }
      });
    }
    return () => {
      momentumMotionValues.delete(motionValue);
      momentumSubscribers--;
      if (momentumSubscribers === 0 && momentumUnsubscribe) {
        momentumUnsubscribe();
        momentumUnsubscribe = null;
      }
    };
  }, [motionValue]);
}
