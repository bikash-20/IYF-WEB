import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { Badge } from '@/components/ui/Badge.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { CalendarSection } from '@/components/sections/CalendarSection.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';
import { upcomingEvents, annualFestivals } from '@/data/events.js';

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function EventsPage() {
  useMeta({
    title: `Events & Festivals — ${site.name}`,
    description: 'Upcoming events and annual festivals at the mandir.',
  });

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="Events"
        eyebrow="Festival life"
        title="Events & Festivals"
        description="From daily kirtan gatherings to the multi-day Krishna Leela Mela — these are the moments the Sylhet youth community builds itself around each year."
      />

      <Section>
        <Container>
          <SectionHeading eyebrow="Upcoming" title="What's next" />
          <ul className="divide-y divide-temple-800/10 overflow-hidden rounded-xl2 border border-temple-800/10 bg-cream-50">
            {upcomingEvents.map((ev) => {
              const d = formatDate(ev.start);
              const [day, mon] = d ? d.split(' ') : [ev.recurring?.split(' ')[1] ?? '', ''];
              return (
                <li key={ev.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-5 px-5 py-5 md:gap-8 md:px-7">
                  <div className="flex w-16 flex-col items-center justify-center rounded-xl border border-temple-800/10 bg-cream-100 py-2 text-center md:w-20">
                    <span className="font-display text-2xl text-temple-800">
                      {day === 'every' ? '·' : day}
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-saffron-600">
                      {ev.recurring ? ev.recurring.split(' ')[0] : mon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-temple-800 md:text-2xl">{ev.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-temple-700/80">
                      {ev.summary}
                    </p>
                  </div>
                  <Badge tone={ev.tag === 'Weekly' ? 'live' : 'saffron'}>{ev.tag}</Badge>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <SectionHeading
            eyebrow="Calendar"
            title="The Vaishnava year at the mandir"
            description="From daily darshan to month-long observances — every festival at Sri Sri Radha Madhava Mandir is open to all, and prasadam is served free."
          />
          <CalendarSection festivals={annualFestivals} />
        </Container>
      </Section>

      <Section variant="deep">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400">
              Get involved
            </div>
            <h2 className="mt-3 font-display text-display-md text-cream-50">
              Volunteer for the next festival
            </h2>
            <p className="mt-3 text-cream-100/80">
              Krishna Leela Mela runs on youth volunteers — kitchen, prasadam, decoration, registration desks, stage crew.
            </p>
          </div>
          <Button as="link" to="/contact" className="bg-saffron-500 hover:bg-saffron-600">
            Sign Up to Volunteer
          </Button>
        </Container>
      </Section>
    </motion.div>
  );
}
