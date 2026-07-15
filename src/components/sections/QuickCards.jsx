import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { Card, CardEyebrow } from '@/components/ui/Card.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';

const cards = [
  {
    n: '01 — Daily',
    title: 'Daily Programs',
    body: 'Mangal Arati, kirtan, and scripture study run every day at the mandir.',
    to: null,
  },
  {
    n: '02 — Seasonal',
    title: 'Upcoming Events',
    body: 'Krishna Leela Mela during Janmashtami, and festival gatherings through the year.',
    to: '/events',
  },
  {
    n: '03 — Course',
    title: 'Be SMART',
    body: 'A life-skills course for youth built on Simplicity, Modesty, Awareness, Regularity, Truthfulness.',
    to: '/courses',
  },
  {
    n: '04 — In person',
    title: 'Visit Us',
    body: 'Opposite Osmani Medical College, Gate No. 1 — everyone is welcome at the mandir, every day.',
    to: '/visit',
  },
];

export function QuickCards() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Start here"
          title="Four ways in"
          lede="Whether you have five minutes or a whole festival day to give, there's a place to begin."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const inner = (
              <>
                <CardEyebrow>{c.n}</CardEyebrow>
                <h3 className="mt-1 font-display text-2xl text-temple-800">{c.title}</h3>
                <p className="text-sm leading-relaxed text-temple-700/80">{c.body}</p>
                {c.to && (
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-eyebrow text-saffron-600">
                    Open <ArrowUpRight size={12} />
                  </span>
                )}
              </>
            );
            return (
              <RevealOnScroll key={c.title} delay={i * 0.06}>
                {c.to ? (
                  <Link to={c.to} className="block focus:outline-none">
                    <Card interactive>{inner}</Card>
                  </Link>
                ) : (
                  <Card>{inner}</Card>
                )}
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
