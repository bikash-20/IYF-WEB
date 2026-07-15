import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';
import { smartCourse } from '@/data/courses.js';

const meta = [
  { k: 'Format', v: smartCourse.format },
  { k: 'Duration', v: smartCourse.duration },
  { k: 'Who it\'s for', v: smartCourse.audience },
  { k: 'Where', v: smartCourse.location },
];

export function CoursesPage() {
  useMeta({
    title: `Be SMART Course — ${site.name}`,
    description: 'A five-part life-skills course for youth — Simplicity, Modesty, Awareness, Regularity, Truthfulness.',
  });

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="Courses"
        eyebrow="Life-skills course for youth"
        title="Be SMART"
        description="A five-part course built around Simplicity, Modesty, Awareness, Regularity, and Truthfulness — practical grounding for young devotees, drawn from Krishna conscious teaching."
      />

      <Section>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.k} className="rounded-xl2 border border-temple-800/10 bg-cream-100/60 p-5">
                <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-600">{m.k}</div>
                <div className="mt-1 font-display text-lg text-temple-800">{m.v}</div>
              </div>
            ))}
          </div>

          <SectionHeading
            className="mt-20"
            eyebrow="Course modules"
            title="Five weeks, five principles"
          />

          <ul className="grid gap-4 md:grid-cols-2">
            {smartCourse.modules.map((m, i) => (
              <RevealOnScroll as="li" key={m.letter} delay={i * 0.05}>
                <div className="grid grid-cols-[auto_1fr] items-start gap-5 rounded-xl2 border border-temple-800/10 bg-cream-50 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-saffron-500/40 font-display text-2xl text-saffron-600">
                    {m.letter}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-temple-800">{m.word}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-temple-700/85">{m.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </ul>
        </Container>
      </Section>

      <Section variant="deep">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400">
              Next batch
            </div>
            <h2 className="mt-3 font-display text-display-md text-cream-50">Join the course</h2>
            <p className="mt-3 text-cream-100/80">
              New batches open a few times a year. Reach out and we'll let you know when the next one starts.
            </p>
          </div>
          <Button as="link" to="/contact" className="bg-saffron-500 hover:bg-saffron-600">
            Ask About the Next Batch
          </Button>
        </Container>
      </Section>
    </motion.div>
  );
}
