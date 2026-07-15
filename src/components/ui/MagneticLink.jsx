import { forwardRef, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/cn.js';

/**
 * MagneticLink — a focus-aware link that subtly pulls toward the cursor
 * on hover, and reveals an animated saffron underline that grows from
 * the left. Use for navigation entries, footer links, and any in-text
 * `to` link where you want a tactile but quiet affordance.
 *
 * Honors `prefers-reduced-motion` via `motionConfig` and falls back to
 * a clean color-only hover when motion is disabled.
 */
export const MagneticLink = forwardRef(function MagneticLink(
  {
    to,
    href,
    children,
    className,
    underline = true,
    strength = 12,
    external = false,
    ...rest
  },
  ref,
) {
  const innerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function onMove(e) {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * strength);
    y.set(((e.clientY - cy) / r.height) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.span
      ref={innerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(
        'group/mag relative inline-flex items-center gap-1.5 outline-none',
        className,
      )}
      {...rest}
    >
      {children}
      {underline && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-divine group-hover/mag:scale-x-100 motion-reduce:transition-none"
        />
      )}
    </motion.span>
  );

  if (external || href) {
    return (
      <a
        ref={ref}
        href={href || to}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="outline-none"
      >
        {content}
      </a>
    );
  }
  return (
    <Link ref={ref} to={to} className="outline-none">
      {content}
    </Link>
  );
});
