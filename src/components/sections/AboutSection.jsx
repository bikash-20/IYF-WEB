import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { EditorialImage } from '@/components/ui/EditorialImage.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { stagger, fadeUp } from '@/lib/motion.js';
import { site } from '@/lib/site.js';

/**
 * AboutSection — the temple's story.
 *
 * v0.2 changes:
 *   - Floating image with EditorialImage (saffron glow, soft shadow)
 *   - Text column intentionally starts at top, image is offset down —
 *     creates the "offset" the user asked for so the layout has rhythm
 *   - Replaces ad-hoc styles with Section + Radials + design system
 */
export function AboutSection() {
  return (
    <Section variant="soft" pad="default">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Text column — starts higher (items-start) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger(0.1)}
            className="md:col-span-7 md:pt-2"
          >
            <motion.div variants={fadeUp} className="eyebrow">
              About the mandir
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-display-lg text-balance text-temple-900 dark:text-fg-main dark:glow-gold-soft"
            >
              A quiet place to remember{' '}
              <span className="text-saffron-gradient italic">Krishna</span>.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-prose text-lg leading-relaxed text-temple-800/85 dark:text-fg-body dark:leading-dark"
            >
              ISKCON Youth Forum is the youth community of Sri Sri Radha Madhava
              Mandir in Jugaltila. Since 2007, this temple has hosted daily darshan,
                           scripture classes, the Be SMART course, and a youth kirtan movement
              that has carried across Sylhet and beyond.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-prose text-base leading-relaxed text-temple-800/70 dark:text-fg-body dark:leading-dark"
            >
              We are non-sectarian within the Vaishnava tradition, and the doors
              of the mandir are open to everyone — to chant, to hear, to sit for
              a moment in peace. Children, students, working professionals, and
              seekers from every walk sit together at every programme.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-temple-900 px-5 py-2.5 text-xs font-medium uppercase tracking-eyebrow text-cream-50 transition-all duration-300 hover:bg-temple-800 dark:bg-ink-floating dark:text-fg-main dark:hover:bg-ink-lift dark:shadow-soft"
              >
                Read the temple&apos;s story
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                to="/visit"
                className="inline-flex items-center gap-2 rounded-full border border-temple-800/30 px-5 py-2.5 text-xs font-medium uppercase tracking-eyebrow text-temple-900 transition-all duration-300 hover:border-saffron-500 hover:text-saffron-600 dark:border-white/15 dark:text-fg-main dark:hover:border-saffron-400 dark:hover:text-saffron-400"
              >
                Plan your visit
              </Link>
            </motion.div>
          </motion.div>

          {/* Image column — offset down for the staggered rhythm */}
          <div className="md:col-span-5 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="relative"
            >
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
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
