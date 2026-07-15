import { useMemo } from 'react';

/**
 * DustField — a layer of very subtle, slowly drifting particles
 * behind the hero deity. Tuned to feel like incense smoke and temple
 * dust caught in a shaft of light. Particles are deterministic per
 * mount (no hydration mismatch) and respect prefers-reduced-motion.
 *
 * Implementation note: we render the particles as positioned divs and
 * drive them with a single CSS keyframe via inline custom properties
 * (`--dx`, `--dy`, `--delay`, `--duration`). This stays GPU-friendly
 * (transform + opacity) and avoids per-particle Framer overhead.
 */
export function DustField({ count = 28, seed = 17 }) {
  const particles = useMemo(() => makeParticles(count, seed), [count, seed]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute block rounded-full bg-cream-50 mix-blend-screen will-change-transform"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            boxShadow: p.glow
              ? '0 0 6px 2px rgba(253, 224, 152, 0.55)'
              : undefined,
            animationName: 'drift',
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
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
    const size = 1 + Math.round(rand() * 2.5); // 1–3.5px
    const opacity = 0.18 + rand() * 0.45;
    const blur = rand() > 0.7 ? 1 : 0;
    const glow = rand() > 0.78;
    const dx = (rand() - 0.5) * 8; // -4..4 vw
    const dy = -2 - rand() * 6; // always upward-ish, -2..-8 vh
    const dur = 22 + rand() * 30; // 22–52s
    const delay = -rand() * dur; // negative = already mid-cycle
    return { id: i, top, left, size, opacity, blur, glow, dx, dy, dur, delay };
  });
}