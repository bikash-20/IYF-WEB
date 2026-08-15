import { AnimatedNumber } from '@/components/ui/AnimatedNumber.jsx';
import { cn } from '@/lib/cn.js';

/**
 * AnimatedClock — a 12-hour Bangladesh clock whose digits roll like
 * an odometer when the minute ticks over (the page re-renders every
 * minute via useCurrentProgram → useNow).
 *
 * The colon and meridiem stay put; only the hour and minute digits
 * roll, so the clock reads "9:07 PM" but the numbers animate on
 * change instead of hard-swapping.
 */
export function AnimatedClock({ minutes, className }) {
  const h24 = Math.floor(minutes / 60) % 24;
  const min = minutes % 60;
  const meridiem = h24 >= 12 ? 'PM' : 'AM';
  const h12 = ((h24 + 11) % 12) + 1;

  return (
    <span className={cn('inline-flex items-baseline tabular-nums', className)}>
      <AnimatedNumber value={h12} pad={1} />
      <span aria-hidden="true" className="px-px">
        :
      </span>
      <AnimatedNumber value={min} />
      <span className="ml-1">{meridiem}</span>
    </span>
  );
}
