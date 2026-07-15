import { motion } from 'framer-motion';

/**
 * FloatingPetals — a small, lightweight burst of saffron + peacock
 * petals that fly upward in a curved arc from the bottom of the
 * viewport. Used as a celebratory motif on form submit success.
 *
 * Deterministic (seeded) positions, no animation when reduced motion
 * is preferred. Renders nothing until `trigger` is true.
 */
export function FloatingPetals({ count = 14, trigger = true, seed = 42 }) {
  if (!trigger) return null;
  const petals = Array.from({ length: count }, (_, i) => {
    // deterministic pseudo-random
    const rnd = (n) => {
      const x = Math.sin((seed + i * 31 + n) * 9999) * 10000;
      return x - Math.floor(x);
    };
    const left = 8 + rnd(1) * 84; // 8%..92%
    const rotate = (rnd(2) - 0.5) * 360;
    const scale = 0.6 + rnd(3) * 0.6;
    const dur = 1.6 + rnd(4) * 1.4;
    const delay = rnd(5) * 0.35;
    const sway = (rnd(6) - 0.5) * 60; // px
    const palette = ['#D98A2B', '#E0A451', '#136F63', '#FCD9A8'];
    const fill = palette[i % palette.length];
    return { left, rotate, scale, dur, delay, sway, fill, i };
  });

  return (
    <div
      aria-hidden="true"
      className="motion-reduce:hidden pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[80vh] overflow-hidden"
    >
      {petals.map((p) => (
        <motion.span
          key={p.i}
          initial={{ y: 60, opacity: 0, rotate: p.rotate }}
          animate={{
            y: -360,
            x: [0, p.sway, 0],
            opacity: [0, 1, 1, 0],
            rotate: p.rotate + 200,
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            left: `${p.left}%`,
            width: 10 * p.scale,
            height: 14 * p.scale,
            background: p.fill,
            borderRadius: '70% 30% 70% 30%',
          }}
          className="absolute bottom-0"
        />
      ))}
    </div>
  );
}
