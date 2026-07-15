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
const variants = {
  default: 'bg-cream-50 text-temple-800 dark:bg-ink-page dark:text-fg-main',
  warm: 'bg-beige-50 text-temple-800 dark:bg-ink-section dark:text-fg-main',
  soft: 'bg-cream-100 text-temple-800 dark:bg-ink-charcoal dark:text-fg-main',
  pure: 'bg-pure-cream text-temple-800 dark:bg-ink-page dark:text-fg-main',
  haze: 'bg-cream-100 text-temple-800 dark:bg-ink-charcoal dark:text-fg-main',
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
  return (
    <Tag
      id={id}
      className={cn('relative isolate overflow-hidden', variants[variant], padFor[pad], className)}
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
