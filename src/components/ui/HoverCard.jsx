import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn.js';
import { easeDivine } from '@/lib/motion.js';

/**
 * HoverCard — the canonical clickable card. Always rendered as a
 * `<motion.div>` with a saffron glow that brightens on hover and a
 * gentle lift + shadow. When given `to`, it wraps its content in a
 * React Router `<Link>` so the entire surface is one tab stop.
 *
 * Children render inside the inner surface and inherit their own
 * hover styling (e.g., titles can also turn saffron).
 */
export const HoverCard = forwardRef(function HoverCard(
  {
    to,
    href,
    as = 'div',
    className,
    children,
    external = false,
    ariaLabel,
    lift = true,
    ...rest
  },
  ref,
) {
  const isLink = Boolean(to || href || external);

  const inner = (
    <motion.div
      ref={ref}
      whileHover={lift ? { y: -3 } : undefined}
      whileTap={lift ? { y: 0, scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={cn(
        'group/hcard relative isolate overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-100/70 p-6 shadow-soft transition-[box-shadow,border-color,background-color] duration-500 ease-divine motion-reduce:transition-none',
        'hover:border-saffron-500/40 hover:bg-cream-100/90 hover:shadow-temple',
        'focus-within:border-saffron-500/40 focus-within:shadow-temple',
        className,
      )}
      {...rest}
    >
      {/* saffron glow that rises from the bottom-left on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-[radial-gradient(120%_80%_at_0%_100%,rgba(217,138,43,0.16),transparent_60%)] opacity-0 transition-opacity duration-500 ease-divine group-hover/hcard:opacity-100 motion-reduce:transition-none"
      />
      {children}
    </motion.div>
  );

  if (!isLink) return inner;

  if (external || href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className="block outline-none"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} aria-label={ariaLabel} className="block outline-none">
      {inner}
    </Link>
  );
});
