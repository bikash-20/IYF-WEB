import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion.js';
import { cn } from '@/lib/cn.js';

/**
 * SectionHeader — the standard section header. Eyebrow, h2, lede,
 * all with staggered fade-up on viewport entry. Use this instead of
 * building one inline. The internal motion variants are staggered
 * children so the eyebrow lands first, then the title, then the lede.
 */
const variants = stagger(0.12);

export function SectionHeader({ eyebrow, title, lede, align = 'left', className }) {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      className={cn(
        'mb-16 max-w-2xl md:mb-20',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <motion.div variants={fadeUp} className="eyebrow">
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="mt-4 font-display text-display-md text-balance"
      >
        {title}
      </motion.h2>
      {lede && (
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-xl text-base leading-relaxed text-temple-700/80 md:text-lg"
        >
          {lede}
        </motion.p>
      )}
    </motion.header>
  );
}