import { useEffect, useRef } from 'react';

/**
 * Mantra inscription — the only mantra on the site.
 *
 * v0.7.3: dropped from the global header (was sitting between the
 * navbar and the hero and breaking the seamless dark surface). It
 * now lives where it actually belongs in the story — at the end of
 * About, and again at the close of every page inside the Footer.
 *
 * Behaviour:
 *  - No box, no border, no fill. The mantra floats on whatever sits
 *    beneath (a warm Section on About, the dark footer).
 *  - Two colour passes alternate: saffron + cream.
 *  - Two copies of the phrase loop seamlessly (translate -50%).
 *  - Pauses on `prefers-reduced-motion` and when the tab is hidden.
 *
 * `tone` picks the palette so the same component works on cream and
 * dark surfaces without an extra modifier class.
 */
const mantra = [
  'Hare Kṛṣṇa Hare Kṛṣṇa',
  'Kṛṣṇa Kṛṣṇa Hare Hare',
  'Hare Rāma Hare Rāma',
  'Rāma Rāma Hare Hare',
];

const tones = {
  // For warm cream sections — soft saffron + temple brown text.
  warm: {
    a: 'text-saffron-600/70',
    b: 'text-temple-700/55',
  },
  // For the dark footer — saffron + cream.
  deep: {
    a: 'text-saffron-400/70',
    b: 'text-cream-100/55',
  },
};

export function Mantra({ tone = 'warm', className = '' }) {
  const trackRef = useRef(null);
  const palette = tones[tone] ?? tones.warm;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) el.style.animation = 'none';
    const onVis = () => {
      el.style.animationPlayState = document.hidden ? 'paused' : 'running';
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-label="Mahā-mantra"
    >
      <div className="overflow-hidden py-7 md:py-8">
        <div
          ref={trackRef}
          className="flex w-max animate-ticker gap-16 whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.32em]"
        >
          {[0, 1].map((pass) => (
            <div
              key={pass}
              className="flex shrink-0 gap-16"
              aria-hidden={pass === 1}
            >
              {mantra.map((line, i) => (
                <span key={`${pass}-${i}`} className={i % 2 === 0 ? palette.a : palette.b}>
                  {line}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}