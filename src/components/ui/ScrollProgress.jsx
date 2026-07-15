import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — a single 2px saffron hairline at the very top of
 * the viewport that grows from 0 → 100% as the user scrolls the
 * page. Sits above all content with `pointer-events: none`. Hidden
 * completely when reduced motion is preferred.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="motion-reduce:hidden pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-saffron-500 via-saffron-400 to-saffron-500"
    />
  );
}
