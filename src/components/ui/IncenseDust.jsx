import { useMemo } from 'react';

/**
 * IncenseDust — the air inside the temple.
 *
 * A second particle field overlaid on top of DustField. While DustField
 * reads as illuminated motes around the lamp bloom, IncenseDust is
 * the slow, almost-invisible drift that fills the whole hero — the
 * sense that the room has incense smoke caught in a sunbeam.
 *
 * Tuned deliberately low:
 *   - 0.6–1.4 px particles (smaller than DustField's 1.5–4.5 px)
 *   - 0.10–0.22 opacity (vs DustField's 0.22–0.77)
 *   - 60–110 s drift loops (vs DustField's 18–44 s)
 *   - No twinkle; no glow; no warm colour — purely atmospheric
 *
 * Deterministic per mount so SSR matches the client.
 */
export function IncenseDust({ count = 32, seed = 73 }) {
  const motes = useMemo(() => makeMotes(count, seed), [count, seed]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {motes.map((m) => (
        <span
          key={m.id}
          className="absolute block rounded-full bg-cream-50 will-change-transform"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            opacity: m.opacity,
            animationName: 'incense-drift',
            animationDuration: `${m.dur}s`,
            animationDelay: `${m.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
            ['--dx']: `${m.dx}vw`,
            ['--dy']: `${m.dy}vh`,
          }}
        />
      ))}
    </div>
  );
}

function makeMotes(count, seed) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: rand() * 100,
    left: rand() * 100,
    size: 0.6 + rand() * 0.8, // 0.6–1.4 px
    opacity: 0.1 + rand() * 0.12, // 0.10–0.22
    dx: (rand() - 0.5) * 8, // -4..4 vw
    dy: (rand() - 0.5) * 6, // -3..3 vh
    dur: 60 + rand() * 50, // 60–110 s — almost imperceptible
    delay: -rand() * 100,
  }));
}