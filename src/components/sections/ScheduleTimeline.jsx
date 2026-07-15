import { motion } from 'framer-motion';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeader } from '@/components/ui/SectionHeader.jsx';
import { dailySchedule } from '@/data/dailySchedule.js';
import { stagger, fadeUpSm } from '@/lib/motion.js';

/**
 * ScheduleTimeline — the vertical timeline for daily arati.
 *
 * v0.2:
 *   - Uses SectionHeader so the eyebrow/title/lede match every other section
 *   - Saffron dot anchor sits inside a soft saffron halo
 *   - Lines through each entry are quieter (border editorial)
 */
export function ScheduleTimeline() {
  return (
    <Section variant="pure" pad="default">
      <Container>
        <SectionHeader
          eyebrow="Every day at the mandir"
          title="Darshan & Arati Schedule"
          lede="Timings shift slightly with the seasons. Mangal Arati begins before sunrise — please arrive quietly."
        />

        <ol className="relative ml-2 mt-12 border-l border-editorial dark:border-white/8">
          {dailySchedule.map((row, i) => (
            <motion.li
              key={row.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger(0.05)}
              custom={i}
              transition={{ delay: i * 0.04 }}
              className="relative mb-9 pl-9 last:mb-0"
            >
              <motion.span
                variants={fadeUpSm}
                aria-hidden
                className="absolute -left-2 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full"
              >
                <span className="absolute inset-0 rounded-full bg-saffron-500/25 blur-[2px] dark:bg-saffron-400/35" />
                <span className="relative h-2.5 w-2.5 rounded-full border-2 border-cream-50 bg-saffron-500 dark:border-ink-page dark:bg-saffron-400" />
              </motion.span>

              <motion.div
                variants={fadeUpSm}
                className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10"
              >
                <div className="font-mono text-xs uppercase tracking-eyebrow text-saffron-700 dark:text-saffron-400 dark:glow-gold-soft md:w-24 md:shrink-0">
                  {row.time}
                </div>
                <div>
                  <div className="font-display text-2xl text-temple-800 dark:text-fg-main">{row.label}</div>
                  <div className="mt-1 max-w-prose text-sm leading-relaxed text-temple-700/80 dark:text-fg-body dark:leading-dark">
                    {row.note}
                  </div>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
