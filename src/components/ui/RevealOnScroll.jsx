import { useRef, useEffect } from 'react';
import { cn } from '@/lib/cn.js';

/**
 * RevealOnScroll — CSS-driven fade-up reveal.
 *
 * Why this is NOT a Framer Motion whileInView:
 *   Framer Motion's `whileInView` + `viewport.once: true` couples the
 *   "revealed" state to an IntersectionObserver that is *attached to
 *   the motion element instance*. When a parent re-renders (and theme
 *   toggle triggers a parent re-render through the Navbar), Framer's
 *   controller briefly detaches and reattaches the observer. On
 *   reattach the observer may read "out of view" for one frame
 *   because the layout just shifted a pixel from a transition or
 *   scrollbar change. With `once: true`, that single out-of-view
 *   reading is permanent — the element stays at opacity:0 forever.
 *
 * The fix is to remove the per-element coupling entirely:
 *   1. We render a plain <div> with `data-reveal-target`.
 *   2. A *single* global IntersectionObserver (mounted in App.jsx)
 *      flips `data-reveal="yes"` on every target that intersects.
 *   3. CSS transitions handle the fade. There is no `initial` state
 *      in JS — the default for `data-reveal-target` is opacity:1,
 *      and the "hidden" state only applies when `data-reveal="no"`
 *      has been set by JS. If JS never runs, no element is ever
 *      hidden.
 *   4. After 2s, a hard fallback clears `data-reveal="no"` on every
 *      element so nothing is permanently stuck.
 *
 * `delay` is preserved as an inline `transitionDelay` so staggered
 * sequences still feel staggered.
 *
 * Reduced motion: CSS short-circuits the transition to `none` and
 * leaves opacity at 1, so reveals are instantaneous and visible.
 */
export function RevealOnScroll({
  as: Tag = 'div',
  delay = 0,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const el = ref.current;
    if (!el) return undefined;
    // Tell the global observer this element needs to be revealed.
    // The observer lives in App.jsx (one instance, shared across the
    // entire app) and listens for `data-reveal-target` nodes.
    el.setAttribute('data-reveal-target', 'yes');
    el.setAttribute('data-reveal', 'no');
    return undefined;
  }, []);

  const style = {
    transitionDelay: `${delay}s`,
    ...(rest.style || {}),
  };

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
