import { cn } from '@/lib/cn.js';

/**
 * Atmosphere — the section's ambient background layer.
 *
 * Sits behind content as `position: absolute; inset: 0; -z-10`.
 * Composes a base tint with one or more radial lights and optional
 * grain. The intent is to give every section its own mood without
 * resorting to gradients on every primitive.
 *
 * Variants:
 *   - "warm-white"    cream-50 base, soft saffron light from top-right
 *   - "cream-soft"    cream-100 base, deep saffron light bottom-left
 *   - "pure-cream"    pure-cream base, very subtle, for "breathing" bands
 *   - "warm-beige"    beige-50 base, peacock + saffron twin lights
 *   - "peacock-haze"  cream-100 with a peacock veil
 *   - "ink-deep"      ink-900 base, saffron + cream twin lights
 *
 * Each atmosphere can be additionally tuned by passing a `tone` and
 * `light` prop. This file is the single source of truth for "how
 * does this section feel" — primitives should compose it, not
 * duplicate the styles.
 */
// Each atmosphere variant ships a `bg` (light mode) AND a `bgDark`
// counterpart. Atmosphere.jsx paints both — `bg` on a layer that
// only shows in light mode and `bgDark` on a layer that only shows
// in dark mode — so the absolutely-positioned atmosphere fill always
// matches the active theme. Without `bgDark`, the section behind the
// dark body would still paint cream/beige in dark mode, producing the
// "dark navbar + dark cards on cream" look.
//
// Light colors are expressed as `color-mix(in srgb, var(--token) X%, transparent)`
// so each radial gradient resolves through the design tokens in
// tokens.css. This keeps the lights bound to the brand palette and
// means a token rename automatically updates every atmosphere.
const variants = {
  'warm-white': {
    bg: 'bg-cream-50 dark:hidden',
    bgDark: 'hidden bg-ink-page dark:block',
    lights: [
      { color: 'color-mix(in srgb, var(--saffron-400) 16%, transparent)', size: '45%', pos: '78% 18%' },
      { color: 'color-mix(in srgb, var(--cream-50) 60%, transparent)', size: '60%', pos: '20% 90%' },
    ],
  },
  'cream-soft': {
    bg: 'bg-cream-100 dark:hidden',
    bgDark: 'hidden bg-ink-section dark:block',
    lights: [
      { color: 'color-mix(in srgb, var(--saffron-500) 10%, transparent)', size: '50%', pos: '15% 110%' },
      { color: 'color-mix(in srgb, var(--temple-800) 4%, transparent)', size: '70%', pos: '100% 0%' },
    ],
  },
  'pure-cream': {
    bg: 'bg-pure-cream dark:hidden',
    bgDark: 'hidden bg-ink-page dark:block',
    lights: [
      { color: 'color-mix(in srgb, var(--saffron-400) 8%, transparent)', size: '40%', pos: '50% 20%' },
    ],
  },
  'warm-beige': {
    bg: 'bg-beige-50 dark:hidden',
    bgDark: 'hidden bg-ink-page dark:block',
    lights: [
      { color: 'color-mix(in srgb, var(--peacock-500) 10%, transparent)', size: '45%', pos: '15% 30%' },
      { color: 'color-mix(in srgb, var(--saffron-500) 16%, transparent)', size: '50%', pos: '90% 75%' },
    ],
  },
  'peacock-haze': {
    bg: 'bg-cream-100 dark:hidden',
    bgDark: 'hidden bg-peacock-deep dark:block',
    lights: [
      { color: 'color-mix(in srgb, var(--peacock-500) 18%, transparent)', size: '55%', pos: '50% 0%' },
      { color: 'color-mix(in srgb, var(--cream-50) 50%, transparent)', size: '60%', pos: '50% 100%' },
    ],
  },
  'ink-deep': {
    bg: 'bg-ink-900',
    lights: [
      { color: 'color-mix(in srgb, var(--saffron-500) 18%, transparent)', size: '50%', pos: '20% 30%' },
      { color: 'color-mix(in srgb, white 4%, transparent)', size: '70%', pos: '100% 100%' },
    ],
  },
};

export function Atmosphere({ variant = 'warm-white', grain = false, className, children }) {
  const v = variants[variant] || variants['warm-white'];
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      <div className={cn('absolute inset-0', v.bg)} />
      {v.bgDark && <div className={cn('absolute inset-0', v.bgDark)} />}
      {v.lights.map((l, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-normal"
          style={{
            background: `radial-gradient(${l.size} ${l.size} at ${l.pos}, ${l.color} 0%, transparent 70%)`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      {grain && <div className="absolute inset-0 grain opacity-[0.10] mix-blend-multiply" />}
      {children}
    </div>
  );
}