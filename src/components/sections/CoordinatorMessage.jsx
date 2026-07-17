import { Section, Container } from '@/components/ui/Section.jsx';
import { EditorialImage } from '@/components/ui/EditorialImage.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { Reveal } from '@/components/ui/Reveal.jsx';

/**
 * CoordinatorMessage — a personal letter from the youth forum's
 * coordinator.
 *
 * Designed as a handwritten note rather than a corporate "Chairman's
 * Message": generous whitespace on a warm cream field, serif prose at
 * a comfortable measure, a maroon drop-quote to open, and a script
 * signature at the foot. Image mirrors the editorial About section but
 * is offset and unframed so the letter is the protagonist.
 *
 * v0.8.1: replaced Framer Motion `whileInView` variants with the
 * CSS-driven reveal system. Reveal triggers the column as a
 * whole; children stagger via inline delays.
 */
export function CoordinatorMessage() {
  return (
    <Section variant="default" pad="default" className="!py-20 md:!py-28">
      <Container>
        <div className="grid items-start gap-14 md:grid-cols-12 md:gap-20">
          {/* Letter column */}
          <Reveal className="md:col-span-7">
            {/* Eyebrow */}
            <Reveal className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft" delay={0.0}>
              A personal letter
            </Reveal>

            {/* Display headline */}
            <Reveal
              as="h2"
              delay={0.08}
              className="mt-4 font-display text-display-lg text-balance text-temple-900 dark:text-fg-main dark:glow-gold-soft"
            >
              Connecting with your{' '}
              <span className="text-saffron-gradient italic">own heart</span>.
            </Reveal>

            {/* Salutation */}
            <Reveal
              as="p"
              delay={0.16}
              className="mt-10 font-display text-2xl italic text-temple-800 dark:text-fg-main"
            >
              Dear friend,
            </Reveal>

            {/* Letter body — serif prose, generous spacing, narrow measure */}
            <div className="mt-8 space-y-7 max-w-[34rem] text-[1.075rem] leading-[1.85] text-temple-800/85 dark:text-fg-body dark:leading-dark">
              {/* Opening paragraph with drop quote */}
              <Reveal as="p" delay={0.24} className="relative">
                <span
                  aria-hidden="true"
                  className="float-left mr-3 mt-1 font-display text-[5rem] leading-[0.85] text-maroon-600/85 select-none dark:text-maroon-400"
                >
                  &ldquo;
                </span>
                <em className="font-display text-[1.18rem] not-italic text-temple-900 dark:text-fg-main">
                  In today&rsquo;s world, we have learned how to connect with
                  everyone through technology, yet many of us struggle to
                  connect with our own hearts.
                </em>{' '}
                The Bhagavad-gītā reminds us that lasting peace is not found
                by chasing temporary achievements, but by awakening our
                eternal relationship with Śrī Kṛṣṇa.
              </Reveal>

              <Reveal as="p" delay={0.32}>
                Through sincere chanting of the Holy Name, hearing
                transcendental wisdom, serving others with humility, and
                keeping the company of devotees, the heart gradually becomes
                peaceful, joyful, and filled with purpose.
              </Reveal>

              <Reveal as="p" delay={0.40}>
                ISKCON Youth Forum Sylhet is more than a gathering &mdash; it
                is a spiritual family where young people grow together in
                devotion, character, and compassion. Whether you are taking
                your very first step on the spiritual path or have been
                practicing for many years, you are always welcome here. Come
                with an open heart, ask questions, chant with us, study the
                timeless wisdom of the Bhagavad-gītā, and experience the
                happiness that comes from serving the Supreme Lord with love.
              </Reveal>

              <Reveal as="p" delay={0.48}>
                May Lord Śrī Kṛṣṇa bless you with wisdom to choose the right
                path, strength to walk it with determination, and devotion to
                remember Him in every moment of life. We look forward to
                welcoming you to ISKCON Youth Forum Sylhet.
              </Reveal>
            </div>

            {/* Signature block */}
            <Reveal
              delay={0.56}
              className="mt-12 max-w-[34rem] border-t border-saffron-500/30 pt-8 dark:border-saffron-400/25"
            >
              <div className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-temple-700/60 dark:text-fg-muted">
                With warm regards,
              </div>
              <div
                className="mt-3 font-handwriting text-[2.6rem] leading-none text-temple-900 dark:text-fg-main dark:glow-gold-soft"
                style={{ letterSpacing: '0.01em' }}
              >
                Devarshi Srivas Dasa
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.65rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
                <span>— Coordinator</span>
                <span className="text-temple-700/40 dark:text-fg-muted/60">·</span>
                <span className="text-temple-700/70 dark:text-fg-muted">
                  ISKCON Youth Forum, Sylhet
                </span>
              </div>
            </Reveal>
          </Reveal>

          {/* Portrait column — offset for editorial rhythm, unframed */}
          <div className="md:col-span-5 md:pt-20">
            <Reveal delay={0.15} as="figure" className="relative">
              <RadialLight
                tone="maroon"
                alpha={0.16}
                size="65%"
                pos="100% 100%"
                className="!absolute -right-12 -top-12 hidden md:block"
              />
              <EditorialImage
                src="/devarshi-srivas-dasa.jpg"
                alt="Devarshi Srivas Dasa, Coordinator of ISKCON Youth Forum Sylhet"
                aspect="4/5"
                interactive
              />
              <figcaption className="mt-5 text-center font-display text-base italic text-temple-700/70 dark:text-fg-muted md:text-left">
                &mdash; Devarshi Srivas Dasa
                <span className="mt-0.5 block font-mono text-[0.62rem] not-italic uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
                  Coordinator, IYF Sylhet
                </span>
              </figcaption>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}