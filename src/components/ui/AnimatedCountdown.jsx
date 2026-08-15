import { AnimatedNumber } from '@/components/ui/AnimatedNumber.jsx';
import { cn } from '@/lib/cn.js';

/**
 * AnimatedCountdown — a "time until" phrase whose digits roll like an
 * odometer when the value changes.
 *
 * Takes a minutes-until value and renders it the way a human would
 * say it ("moments", "7 minutes", "1 h 12 m"), with the numeric parts
 * animating on change instead of hard-swapping. `short` switches the
 * units to their terse schedule form ("min" / "h") for cramped rows.
 *
 * Returns null for a null/undefined value so callers can drop it into
 * JSX without a guard.
 */
export function AnimatedCountdown({ minutes, short = false, className }) {
  if (minutes == null) return null;

  const digit = (value, extra) => (
    <AnimatedNumber
      value={value}
      pad={1}
      className={cn('tabular-nums', extra)}
    />
  );

  if (minutes < 1) {
    return <span className={className}>moments</span>;
  }

  if (minutes < 60) {
    const unit = short ? 'min' : minutes === 1 ? 'minute' : 'minutes';
    return (
      <span className={cn('whitespace-nowrap', className)}>
        {digit(minutes)} {unit}
      </span>
    );
  }

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (m === 0) {
    const unit = short ? 'h' : h === 1 ? 'hour' : 'hours';
    return (
      <span className={cn('whitespace-nowrap', className)}>
        {digit(h)} {unit}
      </span>
    );
  }

  return (
    <span className={cn('whitespace-nowrap', className)}>
      {digit(h)} h {digit(m)} m
    </span>
  );
}
