import { cn } from '@/lib/cn.js';

/**
 * RadialLight — a single soft radial light used to add warmth behind
 * a card or image. Multiple lights can be stacked.
 *
 * Use sparingly. The intent is depth, not decoration.
 *
 * v0.3:
 *   - Softens the gradient fade to 100% so there's no visible edge
 *     even on bright surfaces
 *   - Adds a `blur(2px)` filter on the gradient so the falloff feels
 *     ambient, not stage-lit
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
        background: `radial-gradient(${size} ${size} at ${pos}, ${color} 0%, transparent 100%)`,
        filter: 'blur(3px)',
      }}
    />
  );
}