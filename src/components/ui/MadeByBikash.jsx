import { useState } from 'react';

/**
 * MadeByBikash — replaces the cold "UI concept · v0.6" string with
 * a living, interactive credit that breathes a little on hover.
 *
 * Three states:
 *   - idle  : muted cream-100/60 mono text, plain
 *   - hover : saffron→peacock gradient sweeps across the letters,
 *             and an underline draws from the center outwards
 *   - tap   : slight peacock flash
 *
 * Pure CSS + tiny state — no motion deps. Safe under reduced-motion
 * (gradient stays static, underline still draws because it's a tiny
 * opacity/scale shift rather than a transform animation).
 */

const BIO = 'Bikash Talukder';

export function MadeByBikash() {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="https://github.com/bikash-20"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={`Designed and developed by ${BIO}`}
      className="group/made inline-flex items-baseline gap-1.5 font-mono uppercase tracking-eyebrow"
    >
      <span className="text-cream-100/45 transition-colors duration-500 ease-divine group-hover/made:text-cream-100/70 motion-reduce:transition-none">
        developed by
      </span>
      <span
        aria-hidden="true"
        className={[
          'relative inline-block bg-clip-text font-display tracking-tight transition-[background-image,letter-spacing] duration-700 ease-divine',
          hover
            ? 'text-transparent bg-gradient-to-r from-saffron-300 via-saffron-500 to-peacock-500 tracking-[0.04em]'
            : 'text-cream-100/85',
        ].join(' ')}
        style={
          hover
            ? {
                backgroundImage:
                  'linear-gradient(110deg, #f1b96b 0%, #d98a2b 35%, #f1b96b 55%, #1b5e7a 100%)',
                backgroundSize: '200% 100%',
                animation: 'madeby-sweep 2.2s linear infinite',
              }
            : undefined
        }
      >
        {BIO}
      </span>
      {/* tiny underline that draws outward from the center */}
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute -bottom-1 left-1/2 h-px bg-gradient-to-r from-transparent via-saffron-400 to-transparent transition-[width,transform] duration-500 ease-divine motion-reduce:transition-none',
          hover ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2',
        ].join(' ')}
      />
      {/* Inject the keyframes once on demand (only render <style> on
          hover so we never ship them to the DOM when unused). */}
      {hover && (
        <style>{`
          @keyframes madeby-sweep {
            0%   { background-position:   0% 50%; }
            100% { background-position: 200% 50%; }
          }
          @media (prefers-reduced-motion: reduce) {
            [aria-label="Designed and developed by Bikash Talukder"] [aria-hidden="true"][class*="font-display"] {
              animation: none !important;
            }
          }
        `}</style>
      )}
    </a>
  );
}
