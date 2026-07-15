import { cn } from '@/lib/cn.js';

/**
 * Section — a vertical band of page content. Variants:
 *  - "default" — cream background
 *  - "muted"   — soft cream-100
 *  - "deep"    — ink-900 with light text, used for breathing room
 *  - "warm"    — sand / temple-brown wash for the About section
 */
const variants = {
  default: 'bg-cream-50 text-temple-800',
  muted: 'bg-cream-100/60 text-temple-800',
  deep: 'bg-ink-900 text-cream-50',
  warm: 'bg-cream-200/60 text-temple-800',
};

export function Section({ as: Tag = 'section', variant = 'default', className, children, ...rest }) {
  return (
    <Tag className={cn('section-pad relative overflow-hidden', variants[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}

export function Container({ className, children, ...rest }) {
  return (
    <div className={cn('container', className)} {...rest}>
      {children}
    </div>
  );
}
