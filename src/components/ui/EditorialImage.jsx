import { cn } from '@/lib/cn.js';

/**
 * EditorialImage — a floating image with a soft saffron light behind
 * it. Used by About, Gallery, SacredQuote and anywhere a photograph
 * needs to feel handcrafted rather than dropped in.
 *
 * Props:
 *   - src / alt — required
 *   - aspect   — Tailwind aspect-* class (default "4/5")
 *   - caption  — small mono caption shown below
 *   - glow     — color of the soft light behind (default saffron-soft)
 *   - priority  — set true for above-the-fold (skips lazy-loading)
 *   - className — additional container classes
 */
export function EditorialImage({
  src,
  alt,
  aspect = 'aspect-[4/5]',
  caption,
  glow = 'rgba(217,138,43,0.20)',
  priority = false,
  className,
}) {
  return (
    <figure className={cn('relative', className)}>
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] blur-2xl"
        style={{ background: `radial-gradient(60% 60% at 50% 50%, ${glow} 0%, transparent 70%)` }}
      />
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          'relative w-full rounded-editorial object-cover shadow-temple',
          aspect,
        )}
      />
      {caption && (
        <figcaption className="mt-4 font-mono text-[0.7rem] uppercase tracking-eyebrow text-temple-700/70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}