import { useEffect, useRef } from 'react';
import { Atmosphere } from '@/components/ui/Atmosphere.jsx';
import { cn } from '@/lib/cn.js';

/**
 * Section — a vertical band of page content with an atmosphere.
 * Variants map 1:1 to Atmosphere variants. Default = "warm-white".
 *
 * The atmosphere is rendered behind content automatically. Pass
 * `atmosphere={false}` to render the section without ambient lighting
 * (used by the dark SacredQuote and Hero which manage their own).
 *
 * Padding scale:
 *   "default" — generous editorial breathing room
 *   "tight"   — used between Hero and the first interior section ("Arrival")
 *   "tightest"— minimum spacing
 */
// Each variant maps a light mood to its dark counterpart. Without the
// dark: pair, a section hardcoded bg-cream-50 (warm cream) would
// override the body's .dark bg-ink-page in dark mode and leave every
// section stuck on cream paper. The pair below keeps the editorial
// rhythm intact: light = morning darshan, dark = evening arati.
//
// v0.8.1 fix: every non-deep variant now uses `dark:bg-ink-page` so the
// dark background is reliably emitted by Tailwind (no dependency on
// less-frequently-referenced tokens like `ink-section` / `ink-charcoal`
// that could be tree-shaken out of the CSS bundle). The body already
// paints `bg-ink-page`, so sections blend seamlessly with the page.
const variants = {
  default: 'bg-cream-50 text-temple-800 dark:bg-ink-page dark:text-fg-main',
  warm: 'bg-beige-50 text-temple-800 dark:bg-ink-page dark:text-fg-main',
  soft: 'bg-cream-100 text-temple-800 dark:bg-ink-page dark:text-fg-main',
  pure: 'bg-pure-cream text-temple-800 dark:bg-ink-page dark:text-fg-main',
  haze: 'bg-cream-100 text-temple-800 dark:bg-ink-page dark:text-fg-main',
  deep: 'bg-ink-900 text-cream-50 dark:bg-ink-deep dark:text-fg-main',
  transparent: 'bg-transparent',
};

const atmosphereFor = {
  default: 'warm-white',
  warm: 'warm-beige',
  soft: 'cream-soft',
  pure: 'pure-cream',
  haze: 'peacock-haze',
  deep: 'ink-deep',
  transparent: null,
};

const padFor = {
  default: 'section-pad',
  tight: 'section-pad-tight',
  tightest: 'py-12 md:py-16',
  none: '',
};

export function Section({
  as: Tag = 'section',
  variant = 'default',
  pad = 'default',
  atmosphere = true,
  grain = false,
  id,
  className,
  children,
  ...rest
}) {
  // v0.9 premium arrival — every Section wrapper is a Reveal target
  // so the section settles into view as a whole ("focus-pull" weight)
  // instead of its child blocks each fading in independently. The
  // children retain their own per-block RevealOnScroll staggers for
  // detail motion; the section wrapper handles the chapter-level
  // arrival.
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return undefined;
    const el = ref.current;
    el.setAttribute('data-reveal-target', 'yes');
    el.setAttribute('data-reveal', 'no');
    return undefined;
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        'relative isolate overflow-hidden reveal focus-pull',
        variants[variant],
        padFor[pad],
        className,
      )}
      {...rest}
    >
      {atmosphere && atmosphereFor[variant] && (
        <Atmosphere variant={atmosphereFor[variant]} grain={grain} />
      )}
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

export function Editorial({ className, children }) {
  return <div className={cn('editorial', className)}>{children}</div>;
}
