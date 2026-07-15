import { motion } from 'framer-motion';
import { easeDivine } from '@/lib/motion.js';

/**
 * SacredQuote — a quiet, full-bleed quote block. Sits between heavier
 * sections to give the page room to breathe. The background is a
 * darkened deity image with grain on top, so the words feel like
 * they were written in candlelight.
 */
export function SacredQuote({ children, attribution, src }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-ink-900" aria-hidden />
      {src && (
        <img
          src={src}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-30"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 50%, rgba(15,13,20,0.45) 0%, rgba(15,13,20,0.85) 80%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain opacity-20 mix-blend-overlay" />

      <div className="container section-pad text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: easeDivine }}
          className="mx-auto max-w-3xl"
        >
          <div className="mx-auto mb-10 hr-soft bg-saffron-400/70" />
          <blockquote className="font-display text-quote italic text-cream-50 text-balance">
            {children}
          </blockquote>
          {attribution && (
            <div className="mt-10 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-300">
              — {attribution}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}