import { cn } from '@/lib/cn.js';

/**
 * Badge — used for event tags, course labels, status. Small,
 * uppercase, deliberately quiet.
 */
const tones = {
  default: 'border-temple-800/20 text-temple-700',
  saffron: 'border-saffron-500/40 text-saffron-600 bg-saffron-500/5',
  live: 'border-saffron-500/50 text-saffron-600 bg-saffron-500/10',
  peacock: 'border-peacock-500/40 text-peacock-500 bg-peacock-500/5',
  maroon: 'border-maroon-600/40 text-maroon-600 bg-maroon-600/5',
};

export function Badge({ tone = 'default', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-eyebrow',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
