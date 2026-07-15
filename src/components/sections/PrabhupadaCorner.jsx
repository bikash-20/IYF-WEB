import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { EditorialImage } from '@/components/ui/EditorialImage.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { Badge } from '@/components/ui/Badge.jsx';
import { stagger, fadeUp } from '@/lib/motion.js';

/**
 * PrabhupadaCorner — a small biographical section honouring His
 * Divine Grace A. C. Bhaktivedanta Swami Prabhupāda, founder-ācārya
 * of ISKCON and the spiritual master whose teachings are at the
 * root of everything this mandir does.
 *
 * The copy is biographical and verifiable (drawn from public sources)
 * — dates, places, books, milestones. The component itself is purely
 * presentational: photo on the left, body on the right, with a
 * saffron radial to echo the warmth of the lamplight in the photo.
 */

const KEY_FACTS = [
  { label: 'Born',    value: '1 September 1896 · Calcutta' },
  { label: 'Entered', value: '14 November 1977 · Vrindavan' },
  { label: 'Founded', value: 'ISKCON, New York · July 1966' },
  { label: 'Books',   value: '80+ translations & commentaries' },
];

const SELECTED_WRITINGS = [
  'Bhagavad-gītā As It Is',
  'Śrīmad-Bhāgavatam (18 cantos)',
  'Śrī Caitanya-caritāmṛta',
  'Kṛṣṇa, the Supreme Personality of Godhead',
  'The Nectar of Devotion',
  'Teachings of Lord Caitanya',
];

export function PrabhupadaCorner() {
  return (
    <Section variant="soft" pad="default">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Image column — image on the left to break rhythm with the
              About and Coordinator sections above. */}
          <div className="md:col-span-5 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <RadialLight
                color="rgba(217,138,43,0.22)"
                size="60%"
                pos="0% 100%"
                className="!absolute -left-10 -top-10 hidden md:block"
              />
              <EditorialImage
                src="/srila-prabhupada.jpg"
                alt="His Divine Grace A. C. Bhaktivedanta Swami Prabhupāda, founder-ācārya of ISKCON"
                aspect="4/5"
                caption="1 September 1896 — 14 November 1977"
                interactive
              />
              <figure className="absolute -bottom-6 -right-6 hidden max-w-[210px] rounded-editorial border border-temple-800/10 bg-cream-50/95 p-4 shadow-lift dark:border-white/10 dark:bg-ink-floating/95 md:block">
                <div className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-600 dark:text-saffron-400 dark:glow-gold-soft">
                  Founder-ācārya
                </div>
                <div className="mt-1 font-display text-lg leading-tight text-temple-900 dark:text-fg-main">
                  Śrīla Prabhupāda
                </div>
                <div className="mt-2 text-[11px] leading-relaxed text-temple-700/80 dark:text-fg-muted">
                  International Society for
                  <br />
                  Krishna Consciousness
                </div>
              </figure>
            </motion.div>
          </div>

          {/* Body column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger(0.08)}
            className="md:col-span-7 md:order-2 md:pt-2"
          >
            <motion.div variants={fadeUp} className="eyebrow">
              Śrīla Prabhupāda corner
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-display-lg text-balance text-temple-900 dark:text-fg-main dark:glow-gold-soft"
            >
              One man. One trunk of books.{' '}
              <span className="text-saffron-gradient italic">A world awakened.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-4">
              <Badge tone="saffron">Founder-ācārya · ISKCON</Badge>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-prose text-base leading-relaxed text-temple-800/80 dark:text-fg-body dark:leading-dark"
            >
              His Divine Grace A. C. Bhaktivedanta Swami Prabhupāda was born
              Abhay Charan De in Calcutta on 1 September 1896, the day after
              Janmāṣṭamī. A devoted follower of his spiritual master, Śrīla
              Bhaktisiddhānta Sarasvatī Ṭhākura, he received the order to
              spread Kṛṣṇa consciousness in the English-speaking world. In
              1965, at the age of sixty-nine, he sailed alone from Kolkata to
              New York aboard the cargo ship <em>Jaladuta</em>, carrying only
              a few trunks of books and an unshakable conviction.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-prose text-base leading-relaxed text-temple-800/75 dark:text-fg-body dark:leading-dark"
            >
              In July 1966 he incorporated the International Society for
              Krishna Consciousness in New York. In the twelve years that
              followed, he circled the globe fourteen times, opened more than
              a hundred temples, initiated nearly five thousand disciples, and
              published over eighty volumes of translation and commentary —
              bringing the Bhagavad-gītā, the Śrīmad-Bhāgavatam, and the
              teachings of Śrī Caitanya Mahāprabhu to readers across the
              world for the first time.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-prose text-base leading-relaxed text-temple-800/75 dark:text-fg-body dark:leading-dark"
            >
              He left this world in Vrindavan on 14 November 1977. The
              Bhaktivedanta Book Trust, the movement he began, and the
              countless centres that continue his work — including this
              mandir in Sylhet — are his lasting gift to every generation
              that comes after.
            </motion.p>

            {/* Key facts — compact data strip */}
            <motion.dl
              variants={fadeUp}
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-temple-800/10 pt-6 dark:border-white/8 sm:grid-cols-4"
            >
              {KEY_FACTS.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-600 dark:text-saffron-400 dark:glow-gold-soft">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-display text-sm leading-snug text-temple-900 dark:text-fg-main">
                    {f.value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* Selected writings */}
            <motion.div variants={fadeUp} className="mt-8">
              <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-eyebrow text-temple-700/70 dark:text-fg-muted">
                <BookOpen size={12} aria-hidden="true" />
                Selected writings
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {SELECTED_WRITINGS.map((title) => (
                  <li
                    key={title}
                    className="flex items-baseline gap-2 text-sm text-temple-800/85 dark:text-fg-body"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-saffron-500"
                    />
                    <span>{title}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}