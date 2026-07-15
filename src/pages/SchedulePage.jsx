import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';
import { cn } from '@/lib/cn.js';
import { dailySchedule } from '@/data/dailySchedule.js';

export function SchedulePage() {
  useMeta({
    title: `Daily Schedule — ${site.name}`,
    description: `Daily darshan and arati schedule at ${site.legalName}, Sylhet.`,
  });

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="Schedule"
        eyebrow="Daily worship"
        title="Darshan & Arati Schedule"
        description="A full day at the mandir, from the first arati before sunrise to the evening kirtan. Timings shift slightly with the season."
      />

      <Section>
        <Container>
          <ol className="relative ml-2 border-l border-temple-800/15">
            {dailySchedule.map((row, i) => {
              const isClosed = row.kind === 'closes';
              return (
                <RevealOnScroll as="li" key={row.id} delay={i * 0.04} className="relative pl-8 pb-10 last:pb-0">
                  <span
                    className={cn(
                      'absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-cream-50',
                      isClosed ? 'bg-peacock-500/60' : 'bg-saffron-500',
                    )}
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-10">
                    <div
                      className={cn(
                        'font-mono text-sm uppercase tracking-eyebrow md:w-28 md:shrink-0',
                        isClosed ? 'text-peacock-600/80 dark:text-peacock-400' : 'text-saffron-700 dark:text-saffron-400',
                      )}
                    >
                      {row.time}
                    </div>
                    <div>
                      <div
                        className={cn(
                          'font-display text-2xl',
                          isClosed ? 'italic text-temple-700/85' : 'text-temple-800',
                        )}
                      >
                        {row.label}
                      </div>
                      <div className="mt-1 text-sm leading-relaxed text-temple-700/80">{row.note}</div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { k: 'Darshan', v: 'Mornings from Mangala Arati (4:30 AM) to Raj Bhoga Arati (11:45 AM); evenings from Dhoop Arati (4:00 PM) to Shayan Arati (8:15 PM).' },
              { k: 'Closed', v: 'Temple rests from 1:00 PM to 4:00 PM, and again after 8:30 PM.' },
              { k: 'Public holidays', v: 'Only on rare occasions — check the events page.' },
            ].map((b) => (
              <RevealOnScroll key={b.k}>
                <div className="rounded-xl2 border border-temple-800/10 bg-cream-50 p-6 dark:border-white/8 dark:bg-ink-floating/85">
                  <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-700">
                    {b.k}
                  </div>
                  <p className="mt-2 text-sm text-temple-700/85">{b.v}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
