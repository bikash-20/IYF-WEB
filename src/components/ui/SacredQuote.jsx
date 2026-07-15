import { motion } from 'framer-motion';
import { easeDivine } from '@/lib/motion.js';

/**
 * SacredQuote — a quiet, full-bleed quote block. Sits between heavier
 * sections to give the page room to breathe. A deity photo drifts slowly
 * (ken-burns) behind a near-opaque ink veil; a glowing saffron quotation
 * glyph + hairline divider ride above. Words feel written by candlelight.
 */
export function SacredQuote({
  children,
  text,
  attribution,
  source,
  src,
  imageSrc,
  imageAlt,
}) {
  const quoteText = children ?? text;
  const quoteSource = source ?? attribution;
  const quoteImage = imageSrc ?? src;
  const quoteImageAlt = imageAlt ?? '';
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-30 bg-ink-900" aria-hidden />
      {quoteImage && (
        <div
          aria-hidden
          className="absolute inset-0 -z-20 overflow-hidden"
        >
          <img
            src={quoteImage}
            alt={quoteImageAlt}
            aria-hidden
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center opacity-40 anim-kenburns dark:cinematic"
          />
        </div>
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(80% 70% at 50% 45%, rgba(15,13,20,0.30) 0%, rgba(15,13,20,0.78) 70%, rgba(15,13,20,0.92) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,13,20,0.55) 0%, rgba(15,13,20,0.30) 50%, rgba(15,13,20,0.75) 100%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain opacity-15 mix-blend-overlay" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-[55%] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(229,162,74,0.45), rgba(229,162,74,0) 70%)' }}
      />
      <div className="container section-pad text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: easeDivine }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Glowing quotation glyph — large, faded into the dark */}
          <div
            aria-hidden
            className="font-display select-none pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 text-[7rem] leading-none text-saffron-300/30 sm:-top-14 sm:text-[9rem]"
            style={{ textShadow: '0 0 60px rgba(229,162,74,0.35)' }}
          >
            “
          </div>

          {/* Slow-pulse saffron divider */}
          <div className="mx-auto mb-10 h-px w-24 anim-pulse-slow bg-saffron-400/80" />

          <blockquote className="font-display text-quote italic text-cream-50 text-balance">
            {quoteText}
          </blockquote>
          {quoteSource && (
            <div className="mt-10 font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-300">
              — {quoteSource}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}