import { cn } from '@/lib/cn.js';

/**
 * RadialLight — a single soft radial light used to add warmth behind
 * a card or image. Multiple lights can be stacked.
 *
 * Use sparingly. The intent is depth, not decoration.
 *
 * v0.4 (token refactor):
 *   - Accepts a `tone` prop that resolves to a project token so the
 *     light color always tracks the active theme via tokens.css.
 *     Tokens map to the project's CSS custom properties — they
 *     already include dark-mode remap, so the lights swap moods
 *     automatically.
 *   - `color` remains as an escape hatch for dynamic/derived hues
 *     (e.g. the hero lamp that dims with time-of-day).
 *   - Adds a `strength` prop (default 1) so consumers can scale the
 *     alpha without recomputing the rgb triple.
 *
 * Token table (mirrors tokens.css — keep in sync if you rename):
 *   saffron → #D98A2B   (--saffron-500)
 *   peacock → #1B5E7A   (--peacock-500)
 *   lamp    → #E5A24A   (--saffron-400)
 *   temple  → #2E2118   (--temple-700)
 *   maroon  → #5C1620   (--maroon-700)
 *   ink     → #0F0D14   (--ink-900)
 *   cream   → #F5EFC7   (--cream-50)
 */
const TONE_RGB = {
  saffron: '217,138,43',
  peacock: '27,94,122',
  lamp: '229,162,74',
  temple: '46,33,24',
  maroon: '92,22,32',
  ink: '15,13,20',
  cream: '245,239,227',
};

export function RadialLight({
  tone = 'saffron',
  alpha = 0.18,
  strength,
  size = '60%',
  pos = '50% 50%',
  color,
  className,
  ariaHidden = true,
}) {
  const resolved =
    color ?? `rgba(${TONE_RGB[tone] ?? TONE_RGB.saffron},${(alpha * (strength ?? 1)).toFixed(3)})`;
  return (
    <div
      aria-hidden={ariaHidden}
      className={cn('pointer-events-none absolute -z-10 rounded-full', className)}
      style={{
        background: `radial-gradient(${size} ${size} at ${pos}, ${resolved} 0%, transparent 100%)`,
        filter: 'blur(3px)',
      }}
    />
  );
}