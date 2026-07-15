import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { dailySchedule } from '@/data/dailySchedule.js';

export function ScheduleTimeline() {
  return (
    <Section id="schedule">
      <Container>
        <SectionHeading
          eyebrow="Every day at the mandir"
          title="Darshan & Arati Schedule"
          lede="Timings shift slightly with the season — this is the standard daily rhythm."
        />

        <ol className="relative ml-2 border-l border-temple-800/15">
          {dailySchedule.map((row, i) => (
            <RevealOnScroll as="li" key={row.id} delay={i * 0.04} className="relative pl-8 pb-9 last:pb-0">
              <span
                className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-cream-50 bg-saffron-500"
                aria-hidden
              />
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                <div className="font-mono text-sm uppercase tracking-eyebrow text-saffron-600 md:w-28 md:shrink-0">
                  {row.time}
                </div>
                <div>
                  <div className="font-display text-xl text-temple-800">{row.label}</div>
                  <div className="mt-0.5 text-sm text-temple-700/80">{row.note}</div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
