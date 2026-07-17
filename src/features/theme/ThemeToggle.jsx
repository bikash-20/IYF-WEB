import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './useTheme.js';
import { cn } from '@/lib/cn.js';

/**
 * ThemeToggle — the calm sun/moon switch in the navbar.
 *
 * Animation choreography (the "magical rather than abrupt" flip the
 * brief asks for):
 *   1. Icon container cross-fades: outgoing icon scales down + fades,
 *      incoming icon scales up + fades in.
 *   2. Background pill gently tweens between warm cream and dark ink.
 *   3. A subtle radial halo behind the icon breathes at 2.4s so the
 *      hover state feels alive, not static.
 *
 * Reduced motion: cross-fade still happens (so the icon swap reads)
 * but the rotation + scale collapses to a plain opacity transition
 * and the halo stops breathing.
 *
 * Sized for the navbar — 40px square so it sits comfortably next to
 * the saffron Contact pill without competing with it.
 */
export function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  const prefersReduced = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-colors duration-500 ease-divine will-change-transform',
        'border-temple-800/15 bg-cream-50/60 text-temple-800 hover:border-saffron-500 hover:text-saffron-600',
        'dark:border-white/8 dark:bg-ink-card/60 dark:text-fg-body dark:hover:border-saffron-400 dark:hover:text-saffron-400',
        'backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink-page',
        className,
      )}
    >
      {/* Halo — only visible in dark mode, breathes at 2.4s.
          A subtle warm bloom that hints at the oil-lamp theme. */}
      {isDark && (
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(224,170,76,0.22),transparent_60%)]',
            !prefersReduced && 'anim-pulse-slow',
          )}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-flex"
        >
          {isDark ? <Moon size={16} strokeWidth={1.6} /> : <Sun size={16} strokeWidth={1.6} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
