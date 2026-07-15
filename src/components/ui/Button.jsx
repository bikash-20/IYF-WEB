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
  primary:
    'bg-saffron-500 text-cream-50 hover:bg-saffron-600 shadow-soft hover:shadow-saffron',
  ghost:
    'border border-temple-800/25 text-temple-800 hover:border-saffron-500 hover:text-saffron-600 bg-transparent',
  dark:
    'bg-ink-900 text-cream-50 hover:bg-ink-800',
  cream:
    'bg-cream-100 text-temple-800 hover:bg-cream-50 border border-temple-800/10 hover:border-saffron-500',
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
