import { useMemo } from 'react';

/**
 * Embers — slow rising sparks from the lamp bloom area.
 *
 * v0.7.3: small set of warm saffron particles that drift upward
 * with a horizontal sway, fading in and out. Sits above the lamp
 * bloom layer in the hero so the air above the diya reads as lit.
 *
 * Uses deterministic pseudo-random so the sparks don't reshuffle
 * between server and client (no hydration mismatch).
 */
export function Embers({ count = 14, seed = 91 }) {
  const sparks = useMemo(() => makeSparks(count, seed), [count, seed]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute block rounded-full bg-saffron-200 mix-blend-screen"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            boxShadow: '0 0 10px 3px rgba(241, 185, 107, 0.75)',
            animationName: 'ember-rise',
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            ['--ember-dx']: `${s.dx}vw`,
          }}
        />
      ))}
    </div>
  );
}

function makeSparks(count, seed) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  return Array.from({ length: count }, (_, i) => {
    // Sparks start clustered around the lamp bloom (upper-right).
    const top = 30 + rand() * 35; // 30%..65% from top
    const left = 55 + rand() * 35; // 55%..90% from left
    const size = 1.5 + rand() * 2.5; // 1.5–4 px
    const opacity = 0.4 + rand() * 0.4;
    const dx = (rand() - 0.5) * 14; // -7..7 vw sway
    const dur = 8 + rand() * 10; // 8–18 s rise
    const delay = -rand() * dur; // already mid-cycle
    return { id: i, top, left, size, opacity, dx, dur, delay };
  });
}