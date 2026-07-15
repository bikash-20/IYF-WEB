import { cn } from '@/lib/cn.js';

/**
 * Card — a quiet, paper-like surface. Hover state is restrained:
 * the card lifts a few pixels and the border darkens. No harsh
 * shadows, no neon borders.
 */
export function Card({ as: Tag = 'div', className, children, interactive = false, ...rest }) {
  return (
    <Tag
      className={cn(
        'group relative flex flex-col gap-3 rounded-xl2 border border-temple-800/10 bg-cream-50/80 p-7 transition-all duration-500 ease-divine',
        interactive && 'hover:-translate-y-1 hover:border-saffron-500/40 hover:shadow-soft',
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
        'font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600',
        className,
      )}
    >
      {children}
    </div>
  );
}
