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
const variants = {
  default: 'bg-cream-50 text-temple-800',
  warm: 'bg-beige-50 text-temple-800',
  soft: 'bg-cream-100 text-temple-800',
  pure: 'bg-pure-cream text-temple-800',
  haze: 'bg-cream-100 text-temple-800',
  deep: 'bg-ink-900 text-cream-50',
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
