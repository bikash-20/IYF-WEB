import { useEffect, useRef } from 'react';
import { site } from '@/lib/site.js';

/**
 * The mantra ticker is a single, intentionally-slow strip that sits
 * below the navbar. It reads as a continuous rhythm — never a banner.
 * The actual duplication happens once via `aria-hidden`, not in JS,
 * so the announcement list stays clean for screen readers.
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
      className="border-y border-temple-800/10 bg-cream-100/60"
      role="region"
      aria-label={`${site.name} mantra`}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max animate-ticker gap-12 whitespace-nowrap py-2.5 font-mono text-[0.78rem] uppercase tracking-eyebrow text-temple-700"
        >
          {/* Two passes for a seamless loop. */}
          {[0, 1].map((pass) => (
            <div key={pass} className="flex shrink-0 gap-12" aria-hidden={pass === 1}>
              {mantra.map((line, i) => (
                <span
                  key={`${pass}-${i}`}
                  className={i % 2 === 0 ? 'text-saffron-600' : 'text-temple-700'}
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
