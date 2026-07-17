import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { Reveal } from '@/components/ui/Reveal.jsx';
import { smartCourse } from '@/data/courses.js';

export function BeSmartSection() {
  return (
    <Section variant="deep" id="smart">
      <div className="pointer-events-none absolute inset-0 grain opacity-30" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="Life-skills course"
          title="Be SMART"
          lede={
            <>
              Five principles, one course — built for young people finding their footing in practice
              and in life.{' '}
              <Link
                to="/courses"
                className="text-saffron-400 underline-offset-4 hover:underline"
              >
                See the full course →
              </Link>
            </>
          }
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {smartCourse.modules.map((m, i) => (
            <Reveal as="li" key={m.letter} index={i} gap={0.05}>
              <div className="group relative flex h-full flex-col gap-3 rounded-xl border border-cream-50/10 bg-cream-50/[0.03] p-6 transition-colors duration-500 hover:border-saffron-400/40 hover:bg-cream-50/[0.06] dark:border-white/8 dark:bg-ink-lift/70 dark:hover:border-saffron-400/45 dark:hover:bg-ink-lift/85">
                <div className="font-display text-4xl text-saffron-400 dark:glow-gold-soft">{m.letter}</div>
                <div className="font-display text-xl text-cream-50 dark:text-fg-main">{m.word}</div>
                <p className="text-sm leading-relaxed text-cream-100/70 dark:text-fg-body dark:leading-dark">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
