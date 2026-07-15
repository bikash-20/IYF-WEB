import { cn } from '@/lib/cn.js';

/**
 * TempleDivider — a quiet vertical breathing moment between sections.
 * A single saffron rule with a small mantra label below it. Used to
 * create the "intentional pause" between the louder sections of the
 * home page. Pure decoration, hidden from screen readers.
 */
export function TempleDivider({ label, className }) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex flex-col items-center gap-3 py-12 md:py-20',
        className,
      )}
    >
      <div className="hr-soft bg-saffron-400/80" />
      {label && (
        <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600/80">
          {label}
        </div>
      )}
    </div>
  );
}