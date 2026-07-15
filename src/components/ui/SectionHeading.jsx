import { cn } from '@/lib/cn.js';
import { Reveal } from '@/components/ui/Reveal.jsx';

/**
 * SectionHeading — small eyebrow + h2 + optional lede. Renders with
 * a gentle fade-up on first scroll into view.
 *
 * v0.8.1: replaced Framer Motion `whileInView` with Reveal so the
 * fade-up is robust against theme toggle re-renders.
 */
export function SectionHeading({ eyebrow, title, lede, className, align = 'left' }) {
  return (
    <Reveal
      className={cn(
        'mb-12 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-3 font-display text-display-md text-balance">{title}</h2>
      {lede && <p className="mt-4 text-base leading-relaxed text-temple-700/80 md:text-lg">{lede}</p>}
    </Reveal>
  );
}
