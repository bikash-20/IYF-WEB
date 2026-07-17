import { useMemo } from 'react';

/**
 * DustField — the layer of slow particles behind the hero deity.
 *
 * v0.7.3 — Living Hero pass 2: dial the motion up so the air reads
 * as alive. The previous tuning (1–3.5 px particles, 22–52 s loops,
 * pure white) was almost invisible against the deity photo at
 * today's opacities. We're now:
 *   - Larger particles (1.5–4.5 px)
 *   - Two colour groups — warm cream for general dust, golden
 *     saffron embers for the lit shaft over the lamp
 *   - Wider drift range with a soft horizontal sway
 *   - A fraction of particles twinkle (opacity loop) so the field
 *     shimmers instead of drifting in lockstep
 *   - Always visible (the `motion-reduce:hidden` wrapper was
 *     killing the field on devices that report reduced motion for
 *     accessibility — we now let the keyframes fall back to the
 *     CSS reduce query, which scales them down rather than
 *     removing them)
 *
 * Deterministic per mount (no hydration mismatch).
 */
export function DustField({ count = 44, seed = 17 }) {
  const particles = useMemo(() => makeParticles(count, seed), [count, seed]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute block rounded-full will-change-transform ${
            p.warm ? 'bg-saffron-200' : 'bg-cream-50'
          }`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            boxShadow: p.glow
              ? p.warm
                ? '0 0 10px 3px color-mix(in srgb, var(--saffron-300) 65%, transparent)'
                : '0 0 8px 2px color-mix(in srgb, var(--saffron-300) 55%, transparent)'
              : undefined,
            mixBlendMode: p.warm ? 'screen' : 'screen',
            animationName: p.twinkle ? 'twinkle, drift' : 'drift',
            animationDuration: p.twinkle
              ? `${p.twinkleDur}s, ${p.dur}s`
              : `${p.dur}s`,
            animationDelay: `${p.delay}s, ${p.delay}s`,
            animationTimingFunction: 'ease-in-out, ease-in-out',
            animationIterationCount: 'infinite, infinite',
            animationDirection: 'alternate, alternate',
            ['--dx']: `${p.dx}vw`,
            ['--dy']: `${p.dy}vh`,
          }}
        />
      ))}
    </div>
  );
}

function makeParticles(count, seed) {
  // Deterministic pseudo-random so the particles don't shuffle on
  // every render and SSR matches the client.
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  return Array.from({ length: count }, (_, i) => {
    const top = rand() * 100;
    const left = rand() * 100;
    const size = 1.5 + rand() * 3; // 1.5–4.5px
    const opacity = 0.22 + rand() * 0.55;
    const blur = rand() > 0.6 ? 1.5 : 0;
    const glow = rand() > 0.78;
    // A handful of particles are warm saffron "embers" — concentrated
    // roughly in the upper-right where the lamp bloom lives.
    const warm = rand() > 0.78 && left > 55 && top < 65;
    // Wider drift: -7..7 vw horizontal, -3..-12 vh upward.
    const dx = (rand() - 0.5) * 14;
    const dy = -3 - rand() * 9;
    const dur = 18 + rand() * 26; // 18–44s — tighter loops feel alive
    const delay = -rand() * dur; // negative = already mid-cycle
    const twinkle = rand() > 0.55;
    const twinkleDur = 3 + rand() * 5; // 3–8s opacity loop
    return {
      id: i,
      top,
      left,
      size,
      opacity,
      blur,
      glow,
      warm,
      dx,
      dy,
      dur,
      delay,
      twinkle,
      twinkleDur,
    };
  });
}