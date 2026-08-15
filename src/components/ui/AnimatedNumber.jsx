import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn.js';
import { easeDivine } from '@/lib/motion.js';

/**
 * AnimatedNumber — a countdown digit that rolls upward when its value
 * changes, like a mechanical odometer.
 *
 * The old value slides out the top while the new one slides in from
 * the bottom. Uses AnimatePresence keyed on the padded string so
 * every tick gets a fresh, contained roll instead of a hard swap.
 * `useReducedMotion` collapses the roll to an instant crossfade for
 * users who prefer reduced motion.
 *
 * Keep the container's width stable (padded 2-digit strings are the
 * common case — e.g. "07") so the roll doesn't reflow the layout.
 */
export function AnimatedNumber({ value, pad = 2, className }) {
  const prefersReduced = useReducedMotion();
  const text = String(value).padStart(pad, '0');

  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={prefersReduced ? { opacity: 0 } : { y: '1.1em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { y: '-1.1em', opacity: 0 }}
          transition={{ duration: 0.5, ease: easeDivine }}
          className={cn('inline-block', className)}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
