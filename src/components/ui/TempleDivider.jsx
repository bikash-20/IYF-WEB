import { cn } from '@/lib/cn.js';

/**
 * TempleDivider — a quiet vertical breathing moment between sections.
 * A single saffron rule with a small mantra label below it. The
 * `motif` prop chooses a tiny SVG glyph (lotus / bell / peacock)
 * to give each transition its own personality; default is none.
 * Pure decoration, hidden from screen readers.
 */
const Motif = ({ kind }) => {
  if (kind === 'lotus') {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden
        className="text-saffron-500/80"
        fill="currentColor"
      >
        <path d="M12 2c1 3 1 5 0 8-1-3-1-5 0-8zm0 12c2 1 4 2 6 4-3 1-5 0-6-2-1 2-3 3-6 2 2-2 4-3 6-4zm0-2c-1-2-3-3-6-4 1-2 4-2 6 0 2-2 5-2 6 0-3 1-5 2-6 4z" />
      </svg>
    );
  }
  if (kind === 'bell') {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden
        className="text-saffron-500/80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0-6 6c0 4-2 6-3 7h18c-1-1-3-3-3-7a6 6 0 0 0-6-6z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </svg>
    );
  }
  if (kind === 'peacock') {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden
        className="text-peacock-500/80"
        fill="currentColor"
      >
        <circle cx="12" cy="6" r="1.6" />
        <path d="M12 8c-2 1-3 3-3 6 0 2 1 4 3 4s3-2 3-4c0-3-1-5-3-6zm0 12c-1 0-2 1-2 2h4c0-1-1-2-2-2z" />
      </svg>
    );
  }
  return null;
};

export function TempleDivider({ label, motif, className }) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex flex-col items-center gap-3 py-10 md:py-14',
        className,
      )}
    >
      <div className="hr-soft bg-saffron-400/80" />
      {motif && <Motif kind={motif} />}
      {label && (
        <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600/80">
          {label}
        </div>
      )}
    </div>
  );
}