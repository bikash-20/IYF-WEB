import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion.js';
import { cn } from '@/lib/cn.js';

/**
 * SectionHeading — small eyebrow + h2 + optional lede. Renders with
 * a gentle fade-up on first scroll into view via Framer Motion.
 */
export function SectionHeading({ eyebrow, title, lede, className, align = 'left' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      className={cn(
        'mb-12 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-3 font-display text-display-md text-balance">{title}</h2>
      {lede && <p className="mt-4 text-base leading-relaxed text-temple-700/80 md:text-lg">{lede}</p>}
    </motion.div>
  );
}
