import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn.js';

/**
 * Button — three intents, three sizes. Works as a `<button>`, an
 * `<a>`, or a React Router `<Link>`. Keeps focus rings, hover, and
 * press feedback consistent across the app.
 */
const variants = {
  primary:
    'bg-saffron-500 text-cream-50 hover:bg-saffron-600 shadow-soft',
  ghost:
    'border border-temple-800/25 text-temple-800 hover:border-saffron-500 hover:text-saffron-600 bg-transparent',
  dark:
    'bg-ink-900 text-cream-50 hover:bg-ink-800',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-eyebrow transition-all duration-300 ease-divine will-change-transform';

export const Button = forwardRef(function Button(
  {
    as = 'button',
    to,
    href,
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
  },
  ref,
) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (as === 'link' && to) {
    return (
      <Link ref={ref} to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  if (as === 'a' || href) {
    return (
      <a ref={ref} href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref} className={cls} {...rest}>
      {inner}
    </button>
  );
});
