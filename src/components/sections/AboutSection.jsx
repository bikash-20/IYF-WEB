import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { EditorialImage } from '@/components/ui/EditorialImage.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { Reveal } from '@/components/ui/Reveal.jsx';
import { site } from '@/lib/site.js';

/**
 * AboutSection — the temple's story.
 *
 * v0.2 changes:
 *   - Floating image with EditorialImage (saffron glow, soft shadow)
 *   - Text column intentionally starts at top, image is offset down —
 *     creates the "offset" the user asked for so the layout has rhythm
 *   - Replaces ad-hoc styles with Section + Radials + design system
 *
 * v0.8.1: replaced Framer Motion `whileInView` variants with the
 * CSS-driven reveal system (RevealOnScroll + Reveal). The old
 * variants-based stagger broke during theme toggle because the
 * per-element IntersectionObserver coupled to Framer Motion's
 * animation controller could leave children stuck at opacity:0.
 * The new system uses one global IntersectionObserver + a 2s
 * hard fallback so children are guaranteed to release regardless
 * of any parent re-render.
 */
export function AboutSection() {
  return (
    <Section variant="soft" pad="default">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Text column — starts higher (items-start). RevealOnScroll
              triggers a CSS fade for the whole column; each child uses
              Reveal with an inline transition-delay for the stagger. */}
          <RevealOnScroll className="md:col-span-7 md:pt-2">
            <Reveal className="eyebrow" delay={0.0}>
              About the mandir
            </Reveal>
            <Reveal as="h2" delay={0.08} className="mt-4 font-display text-display-lg text-balance text-temple-900 dark:text-fg-main dark:glow-gold-soft">
              A quiet place to remember{' '}
              <span className="text-saffron-gradient italic">Krishna</span>.
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-6 max-w-prose text-lg leading-relaxed text-temple-800/85 dark:text-fg-body dark:leading-dark">
              ISKCON Youth Forum is the youth community of Sri Sri Radha Madhava
              Mandir in Jugaltila. Since 2007, this temple has hosted daily darshan,
              scripture classes, the Be SMART course, and a youth kirtan movement
              that has carried across Sylhet and beyond.
            </Reveal>
            <Reveal as="p" delay={0.24} className="mt-5 max-w-prose text-base leading-relaxed text-temple-800/70 dark:text-fg-body dark:leading-dark">
              We are non-sectarian within the Vaishnava tradition, and the doors
              of the mandir are open to everyone — to chant, to hear, to sit for
              a moment in peace. Children, students, working professionals, and
              seekers from every walk sit together at every programme.
            </Reveal>
            <Reveal delay={0.32} className="mt-8 flex flex-wrap gap-3">
              {/* Primary CTA — "Plan your visit" is the single solid
                  action button. Renders the same in light + dark mode. */}
              <Link
                to="/visit"
                className="group inline-flex items-center gap-2 rounded-full bg-temple-900 px-5 py-2.5 text-xs font-medium uppercase tracking-eyebrow text-cream-50 transition-all duration-300 hover:bg-temple-800 dark:bg-ink-floating dark:text-fg-main dark:hover:bg-ink-lift dark:shadow-soft"
              >
                Plan your visit
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              {/* Secondary CTA — outline treatment. */}
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-temple-800/30 px-5 py-2.5 text-xs font-medium uppercase tracking-eyebrow text-temple-900 transition-all duration-300 hover:border-saffron-500 hover:text-saffron-600 dark:border-white/15 dark:text-fg-main dark:hover:border-saffron-400 dark:hover:text-saffron-400"
              >
                Read the temple&apos;s story
              </Link>
            </Reveal>
          </RevealOnScroll>

          {/* Image column — offset down for the staggered rhythm */}
          <div className="md:col-span-5 md:pt-16">
            <Reveal delay={0.15} className="relative">
              <RadialLight
                color="rgba(217,138,43,0.18)"
                size="60%"
                pos="100% 100%"
                className="!absolute -right-10 -top-10 hidden md:block"
              />
              <EditorialImage
                src="/little-2.jpg"
                alt="Soft daylight inside the temple"
                aspect="4/5"
                priority
                interactive
              />
              <figure className="absolute bottom-4 left-4 hidden max-w-[180px] rounded-editorial border border-cream-50/30 bg-cream-50/95 p-4 shadow-lift backdrop-blur-sm dark:border-white/15 dark:bg-ink-floating/95 md:block">
                <div className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft">
                  Est.
                </div>
                <div className="mt-1 font-display text-2xl text-temple-900 dark:text-fg-main">
                  2007
                </div>
                <div className="mt-2 text-[11px] leading-relaxed text-temple-700/80 dark:text-fg-muted">
                  {site.address.city}, Bangladesh
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
