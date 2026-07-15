import { useEffect, useRef } from 'react';
import { site } from '@/lib/site.js';

/**
 * The mantra ticker — v0.7.2: raw floating inscription.
 *
 * No box, no background fill, no border. The mantra text floats
 * directly on top of whatever sits beneath (hero photo on home,
 * cream sections on other pages). The visual weight comes from
 * generous vertical space + reduced opacity (~60%) so the words
 * read as ambient engraving rather than UI chrome.
 *
 * Two passes via `aria-hidden` keep the announcement clean for
 * screen readers and produce a seamless infinite loop without any
 * JS-side duplication.
 */
const mantra = [
  'Hare Kṛṣṇa Hare Kṛṣṇa',
  'Kṛṣṇa Kṛṣṇa Hare Hare',
  'Hare Rāma Hare Rāma',
  'Rāma Rāma Hare Hare',
];

export function Ticker() {
  const trackRef = useRef(null);

  // Pause the animation when the user prefers reduced motion or
  // when the tab is hidden — saves battery and avoids distraction.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) el.style.animation = 'none';
    const onVis = () => {
      el.style.animationPlayState = document.hidden ? 'paused' : 'running';
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return (
    <div
      className="relative bg-transparent"
      role="region"
      aria-label={`${site.name} mantra`}
    >
      {/* Single hairline below the inscription so it has an anchor
         when it floats over very dark sections of the hero. 1px,
         no fill, ~8% white. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.08]"
      />
      <div className="overflow-hidden py-7 md:py-8">
        <div
          ref={trackRef}
          className="flex w-max animate-ticker gap-16 whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.32em]"
        >
          {/* Two passes for a seamless loop. */}
          {[0, 1].map((pass) => (
            <div key={pass} className="flex shrink-0 gap-16" aria-hidden={pass === 1}>
              {mantra.map((line, i) => (
                <span
                  key={`${pass}-${i}`}
                  className={i % 2 === 0 ? 'text-saffron-400/70' : 'text-cream-100/65'}
                >
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
