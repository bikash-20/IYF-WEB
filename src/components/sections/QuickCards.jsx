import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { FloatingCard } from '@/components/ui/FloatingCard.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { Parallax } from '@/components/ui/Parallax.jsx';
import { parallaxPresets } from '@/lib/parallax.js';

/**
 * QuickCards — three handcrafted cards, not SaaS tiles.
 *
 * v0.2: each card is a FloatingCard with an eyebrow, title, body,
 * an animated arrow, and a saffron hr. Three cards is intentional —
 * four was a stretch. The fourth visit-leaning invitation lives in
 * VisitSection below.
 */
const cards = [
  {
    eyebrow: 'Today',
    title: 'Daily Schedule',
    body: 'Six arati and class times across the day, from Mangal Arati before sunrise to Bhagavad-gita in the evening.',
    href: '/schedule',
    cta: 'Open the schedule',
  },
  {
    eyebrow: 'Featured',
    title: 'Upcoming Festivals',
    body: 'Janmashtami, Gaura Purnima, Ratha Yatra, and a half-year of youth programmes at the temple.',
    href: '/events',
    cta: 'See the calendar',
  },
  {
    eyebrow: 'Course',
    title: 'Be SMART',
    body: 'A two-weekend foundational course in spiritual psychology — for young adults 17 and above.',
    href: '/courses',
    cta: 'Explore Be SMART',
  },
];

export function QuickCards() {
  return (
    <Section variant="default" pad="tight">
      {/* Decorative background glow that lags behind the cards as
          the user scrolls through, so the section reads with
          visible depth. Stronger drift than the other integrations
          because this section is a quiet band that needs a single
          piece of motion to feel alive. */}
      <Parallax speed={parallaxPresets.strong} className="absolute inset-0" aria-hidden>
        <RadialLight
          tone="saffron"
          alpha={0.14}
          size="65%"
          pos="50% 50%"
          className="!relative inset-0 h-full w-full"
        />
      </Parallax>
      <Container className="relative">
        <SectionHeading
          eyebrow="Where to begin"
          title="A few good doors in"
          lede="Pick the one that fits the moment you're in."
        />

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((c, i) => (
            <FloatingCard key={c.title} index={i} {...c} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
