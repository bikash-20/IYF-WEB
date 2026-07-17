import { Reveal } from '@/components/ui/Reveal.jsx';

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
        className="bg-veil-ink-radial absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="bg-veil-ink-vertical absolute inset-0 -z-10"
      />
      <div aria-hidden className="absolute inset-0 -z-10 grain opacity-15 mix-blend-overlay" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-[55%] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--saffron-400) 45%, transparent), transparent 70%)' }}
      />
      <div className="container section-pad text-center">
        <Reveal className="relative mx-auto max-w-3xl">
          {/* Glowing quotation glyph — large, faded into the dark */}
          <div
            aria-hidden
            className="font-display select-none pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 text-[7rem] leading-none text-saffron-300/30 sm:-top-14 sm:text-[9rem]"
            style={{ textShadow: '0 0 60px color-mix(in srgb, var(--saffron-400) 35%, transparent)' }}
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
        </Reveal>
      </div>
    </section>
  );
}