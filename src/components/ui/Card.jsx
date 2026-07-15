import { cn } from '@/lib/cn.js';

/**
 * Card — a quiet, paper-like surface. Hover state is restrained:
 * the card lifts a few pixels and the border darkens. No harsh
 * shadows, no neon borders. When `interactive` is true it also
 * exposes a `group/editorial` named group so child <EditorialImage />
 * scales up on hover.
 */
export function Card({ as: Tag = 'div', className, children, interactive = false, ...rest }) {
  return (
    <Tag
      className={cn(
        // Light: warm cream paper, soft temple border. Dark: floating
        // card surface with white-8% border and a softer shadow so
        // the card reads as elevated, not stamped.
        'group relative flex flex-col gap-3 rounded-xl2 border border-temple-800/10 bg-cream-50/80 p-7 transition-all duration-500 ease-divine',
        'dark:border-white/8 dark:bg-ink-card/80 dark:shadow-soft',
        interactive && 'hover:-translate-y-1.5 hover:border-saffron-500/60 hover:shadow-lift hover:bg-cream-50 group/editorial',
        interactive && 'dark:hover:border-saffron-400/50 dark:hover:bg-ink-floating dark:hover:shadow-temple',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function CardEyebrow({ children, className }) {
  return (
    <div
      className={cn(
        'font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft',
        className,
      )}
    >
      {children}
    </div>
  );
}
