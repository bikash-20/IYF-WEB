import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion.js';

/**
 * RevealOnScroll — wraps children in a viewport-aware fade-up. Use
 * sparingly; whole pages should not animate, only key elements.
 */
export function RevealOnScroll({ children, delay = 0, className, as = 'div' }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
