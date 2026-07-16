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
  // The Section wrapper is intentionally NOT a reveal target. Earlier
  // (v0.9.0) we tried making every Section a data-reveal-target so the
  // whole band would settle in as a "chapter". That broke two pages
  // (Contact, Donate) under <Suspense mode="wait"> lazy-loading: the
  // Section's own opacity:0 fired before the lazy chunk finished
  // hydrating, and the IntersectionObserver's MutationObserver saw
  // the new target with a still-unsettled bounding rect (parent
  // <motion.div {...pageEnter}> at y:8, opacity:0 hadn't animated
  // yet). Net effect: scan() queued the target as out-of-view, the
  // observer never fired for it, and the whole section stayed
  // invisible. Chapter-level arrival is now the responsibility of
  // each <RevealOnScroll> / <RevealStagger> block inside the section.
  return (
    <Tag
      id={id}
      className={cn(
        'relative isolate overflow-hidden',
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
