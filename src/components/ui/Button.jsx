import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn.js';

/**
 * Button — three intents, three sizes, four render modes. The motion
 * props live on the outer element so the entire tap target lifts on
 * hover and presses on tap, not just a nested span.
 */
const variants = {
  // Primary saffron — same on both themes. In dark mode we add a
  // text-shadow glow so the gold reads as "oil-lamp" rather than a
  // flat fill, and the soft saffron shadow stays so the button
  // lifts off the page.
  primary:
    'bg-saffron-500 text-temple-900 hover:bg-saffron-400 shadow-soft hover:shadow-saffron dark:text-ink-900 dark:hover:bg-saffron-[#E0AA4C] dark:hover:shadow-saffron dark:glow-gold-soft',
  // Ghost / outline. Light: warm temple border, gold on hover.
  // Dark: barely-there white border (8% opacity), warm gold on
  // hover — the "Apple-glass" pattern the brief asks for.
  ghost:
    'border border-temple-800/25 text-temple-800 hover:border-saffron-500 hover:text-saffron-600 bg-transparent ' +
    'dark:border-white/10 dark:text-fg-body dark:hover:border-saffron-400 dark:hover:text-saffron-400 dark:hover:bg-white/4',
  // Solid dark — the deepest CTA. In light mode it's ink-900; in
  // dark mode it's a slightly-lifted floating card surface so the
  // button reads against the page bg.
  dark:
    'bg-ink-900 text-cream-50 hover:bg-ink-800 dark:bg-ink-floating dark:text-fg-main dark:hover:bg-ink-lift',
  // Cream — for use over the deity hero, or as a "neutral" intent.
  // Dark mode flips to a frosted glass: rgba(255,255,255,.03) bg +
  // 8% white border, slightly more opaque on hover.
  cream:
    'bg-cream-100 text-temple-800 hover:bg-cream-50 border border-temple-800/10 hover:border-saffron-500 ' +
    'dark:bg-white/4 dark:text-fg-main dark:border-white/10 dark:hover:bg-white/8 dark:hover:border-saffron-400/60',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm',
};

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-eyebrow transition-[background-color,color,box-shadow,border-color,transform] duration-300 ease-divine will-change-transform focus-visible:outline-none motion-reduce:transition-none';

export const Button = forwardRef(function Button(
  {
    as = 'button',
    to,
    href,
    variant = 'primary',
    size = 'md',
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const cls = cn(base, variants[variant], sizes[size], className);

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.97 },
    transition: { type: 'spring', stiffness: 380, damping: 26 },
  };

  if (as === 'link' && to) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link ref={ref} to={to} className={cls} {...rest}>
          {children}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(80%_60%_at_50%_120%,rgba(255,255,255,0.18),transparent_70%)] opacity-0 transition-opacity duration-500 ease-divine group-hover/btn:opacity-100 motion-reduce:transition-none"
          />
        </Link>
      </motion.span>
    );
  }
  if (as === 'a' || href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={cls}
        {...motionProps}
        {...rest}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(80%_60%_at_50%_120%,rgba(255,255,255,0.18),transparent_70%)] opacity-0 transition-opacity duration-500 ease-divine group-hover/btn:opacity-100 motion-reduce:transition-none"
        />
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref}
      type={type}
      className={cls}
      {...motionProps}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(80%_60%_at_50%_120%,rgba(255,255,255,0.18),transparent_70%)] opacity-0 transition-opacity duration-500 ease-divine group-hover/btn:opacity-100 motion-reduce:transition-none"
      />
    </motion.button>
  );
});
