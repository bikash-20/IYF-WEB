import { cn } from '@/lib/cn.js';
import { Reveal } from '@/components/ui/Reveal.jsx';

/**
 * SectionHeading — the canonical section header. Eyebrow, h2, lede,
 * all with staggered fade-up on viewport entry. Use this instead of
 * building one inline. Reveal triggers the column; each
 * child uses Reveal with an inline delay for the cascade.
 *
 * v0.8.1: replaced Framer Motion `whileInView` + variants with
 * CSS-driven Reveal to be robust against theme toggle re-renders.
 *
 * v1.0.0: merged with the older single-Reveal SectionHeading. The
 * staggered variant is the canonical version.
 */
export function SectionHeading({ eyebrow, title, lede, align = 'left', className }) {
  return (
    <Reveal
      as="header"
      className={cn(
        'mb-16 max-w-2xl md:mb-20',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal className="eyebrow" delay={0.0}>
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        delay={0.12}
        className="mt-4 font-display text-display-md text-balance"
      >
        {title}
      </Reveal>
      {lede && (
        <Reveal
          as="p"
          delay={0.24}
          className="mt-5 max-w-xl text-base leading-relaxed text-temple-700/80 md:text-lg"
        >
          {lede}
        </Reveal>
      )}
    </Reveal>
  );
}
