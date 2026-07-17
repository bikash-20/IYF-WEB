import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { FloatingCard } from '@/components/ui/FloatingCard.jsx';

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
      <Container>
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
