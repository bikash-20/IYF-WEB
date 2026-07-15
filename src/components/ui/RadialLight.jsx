import { cn } from '@/lib/cn.js';

/**
 * RadialLight — a single soft radial light used to add warmth behind
 * a card or image. Multiple lights can be stacked by passing `stacked`.
 * Defaults to saffron, very subtle.
 *
 * Use sparingly. The intent is depth, not decoration.
 */
export function RadialLight({
  color = 'rgba(217,138,43,0.18)',
  size = '60%',
  pos = '50% 50%',
  className,
  ariaHidden = true,
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className={cn('pointer-events-none absolute -z-10 rounded-full', className)}
      style={{
        background: `radial-gradient(${size} ${size} at ${pos}, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}