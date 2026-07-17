import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn.js';
import { Reveal } from '@/components/ui/Reveal.jsx';

/**
 * FloatingCard — a handcrafted surface used for the editorial card
 * pattern. Composes a saffron glow + soft shadow. Hover lifts the
 * card slightly and reveals the arrow.
 *
 * Has nothing to do with "SaaS dashboard" cards — feels paper-like,
 * with quiet depth.
 *
 * v0.8.1: replaced Framer Motion `whileInView` with Reveal. The
 * index-driven stagger now lives on the Reveal `delay` prop.
 */
export function FloatingCard({
  eyebrow,
  title,
  body,
  to,
  href,
  imageSrc,
  imageAlt = '',
  index,
  className,
}) {
  const inner = (
    <>
      {imageSrc && (
        <div className="relative -mx-7 -mt-7 mb-5 overflow-hidden rounded-t-editorial">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-divine group-hover:scale-[1.04] dark:cinematic"
            />
          </div>
        </div>
      )}
      {eyebrow && (
        <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-300 dark:glow-gold-soft">
          {eyebrow}
        </div>
      )}
      <h3 className="mt-2 font-display text-2xl text-balance text-temple-800 dark:text-fg-main">{title}</h3>
      {body && <p className="mt-3 text-sm leading-relaxed text-temple-700/85 dark:text-fg-body">{body}</p>}
      {(to || href) && (
        <>
          <div className="mt-5 hr-soft dark:bg-fg-body/40" />
          <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-300 dark:glow-gold-soft">
            Open <ArrowUpRight size={12} className="row-arrow transition-transform duration-300 ease-divine" />
          </div>
        </>
      )}
    </>
  );

  const classes = cn(
    'group relative flex h-full flex-col rounded-editorial border border-temple-800/10 bg-cream-50/85 p-7 backdrop-blur-sm transition-all duration-700 ease-divine',
    'hover:-translate-y-1.5 hover:border-saffron-500/40 hover:shadow-temple hover:bg-cream-50',
    'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-editorial before:bg-saffron-500/0 before:blur-2xl before:transition-all before:duration-700',
    'hover:before:bg-saffron-500/10',
    // Dark-mode floating card: floating card surface, white-8%
    // border, deeper shadow on hover. The gold glow halo stays so
    // hover lift remains warm, not cool.
    'dark:border-white/8 dark:bg-ink-floating/85 dark:shadow-lift dark:hover:border-saffron-400/40 dark:hover:bg-ink-lift dark:hover:shadow-temple',
    'dark:hover:before:bg-saffron-500/15',
    className,
  );

  const revealDelay = (index || 0) * 0.06;

  if (to) {
    return (
      <Reveal delay={revealDelay} className="block focus:outline-none">
        <Link to={to} className={classes}>
          {inner}
        </Link>
      </Reveal>
    );
  }
  if (href) {
    return (
      <Reveal as="a" delay={revealDelay} href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </Reveal>
    );
  }
  return (
    <Reveal delay={revealDelay} className={classes}>
      {inner}
    </Reveal>
  );
}