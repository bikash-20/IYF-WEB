import { useRef, useEffect } from 'react';
import { cn } from '@/lib/cn.js';

/**
 * Reveal — single-element CSS fade-up reveal.
 *
 * Renders a plain node with `data-reveal-target` so the *single*
 * global IntersectionObserver (mounted in App.jsx) can flip
 * `data-reveal="yes"` when the node scrolls into view. CSS in
 * index.css handles the fade. There is no per-element observer,
 * which makes Reveal robust against parent re-renders (theme toggle
 * no longer resets opacity).
 *
 * Props:
 *   as        — tag name (defaults to "div").
 *   delay     — extra seconds added to the transitionDelay.
 *   index     — optional index for staggered children. Internally
 *               `delay = index * gap + extraDelay`, where `gap`
 *               defaults to 0.04. Set `gap` to override.
 *   gap       — per-step seconds between staggered children when
 *               using `index`. Defaults to 0.04.
 *   className — appended to the "reveal" base class.
 *   ...rest   — anything else (style, event handlers, aria-*).
 *
 * Reduced motion: the global CSS short-circuits the transition to
 * `none` and leaves opacity at 1 so reveals are instantaneous.
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  index,
  gap = 0.04,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const hasSetInitialState = useRef(false);

  // Mount only — flip on data-reveal-target. Doing this once keeps
  // re-renders (theme toggle, route change) from resetting opacity.
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    if (hasSetInitialState.current) return;
    const el = ref.current;
    el.setAttribute('data-reveal-target', 'yes');
    el.setAttribute('data-reveal', 'no');
    hasSetInitialState.current = true;
  }, []);

  // delay / index changes only update transitionDelay; the
  // data-reveal-target attribute is already set and will not regress.
  useEffect(() => {
    if (!ref.current) return;
    const computedDelay = typeof index === 'number' ? index * gap + delay : delay;
    if (computedDelay) ref.current.style.transitionDelay = `${computedDelay}s`;
  }, [delay, index, gap]);

  const style = {
    ...(rest.style || {}),
  };

  return (
    <Tag ref={ref} className={cn('reveal', className)} style={style} {...rest}>
      {children}
    </Tag>
  );
}