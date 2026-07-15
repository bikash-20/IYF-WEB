import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { Card, CardEyebrow } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';

const timeline = [
  { year: 'Founder-ācārya', body: 'Srila Prabhupada establishes the International Society for Krishna Consciousness in New York, 1966.' },
  { year: 'ISKCON arrives in Bangladesh', body: 'Devotees begin sharing the teachings of Caitanya Mahaprabhu across the country.' },
  { year: 'Sri Sri Radha Madhava Mandir', body: 'The temple at Jugaltila, Kajalshah, becomes a centre for daily worship and youth formation in Sylhet.' },
  { year: 'IYF · Sylhet', body: 'The youth forum is formalised as a structured space for college-age devotees to study, serve, and chant together.' },
];

const values = [
  { eyebrow: 'Sādhana', title: 'Daily practice', body: 'Mangal Arati, japa, and scripture class form the backbone of life at the mandir.' },
  { eyebrow: 'Sanga', title: 'Community', body: 'Youth learn and grow together — in kirtan, classes, and festival service.' },
  { eyebrow: 'Seva', title: 'Service', body: 'Cooking, cleaning, decoration, and stage work are how the temple runs and how we form character.' },
  { eyebrow: 'Śāstra', title: 'Scripture', body: 'Srimad Bhagavatam and Bhagavad-gita are read daily — open to all, no prior knowledge required.' },
];

export function AboutPage() {
  useMeta({
    title: `About — ${site.name}`,
    description: `About ISKCON Youth Forum, Sylhet. The youth wing of ${site.legalName} at Jugaltila, Kajalshah.`,
  });

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="About"
        eyebrow="About the mandir"
        title="A mandir, a school, a community."
        description="The ISKCON Youth Forum is the youth wing of Sri Sri Radha Madhava Mandir — a place where young people in Sylhet can ground a daily spiritual practice inside a community that walks with them."
      />

      <Section variant="warm">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <RevealOnScroll className="md:col-span-6">
              <img
                src="/little-2.jpg"
                alt="Soft daylight at the mandir"
                className="aspect-[4/5] w-full rounded-xl2 object-cover shadow-soft"
                loading="lazy"
              />
            </RevealOnScroll>
            <RevealOnScroll className="md:col-span-6" delay={0.1}>
              <div className="eyebrow">Our story</div>
              <h2 className="mt-3 font-display text-display-md text-balance">
                From a small group of college students to a daily programme.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-temple-700">
                <p>
                  IYF Sylhet began as a small group of students who wanted more than a Sunday
                  programme — they wanted a daily rhythm of practice, study, and service, and a
                  community to do it with.
                </p>
                <p>
                  Today, the forum runs daily arati, scripture classes, and the Be SMART course at
                  Sri Sri Radh Madhava Mandir, alongside a year-round festival calendar.
                </p>
                <p>
                  We are part of a worldwide movement founded by His Divine Grace A.C.
                  Bhaktivedanta Swami Prabhupada, and rooted in the teachings of Caitanya
                  Mahaprabhu and the Gaudiya Vaishnava lineage.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 0.05}>
                <Card>
                  <CardEyebrow>{v.eyebrow}</CardEyebrow>
                  <h3 className="mt-1 font-display text-xl text-temple-800">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-temple-700/80">{v.body}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <div className="eyebrow">Timeline</div>
          <h2 className="mt-3 max-w-2xl font-display text-display-md text-balance">
            A line from Prabhupada to Sylhet.
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2">
            {timeline.map((t, i) => (
              <RevealOnScroll key={t.year} delay={i * 0.05}>
                <li className="rounded-xl2 border border-temple-800/10 bg-cream-50 p-6">
                  <div className="font-mono text-xs uppercase tracking-eyebrow text-saffron-600">
                    {t.year}
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-temple-700">{t.body}</p>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </Container>
      </Section>

      <Section variant="deep">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400">
              Come and see
            </div>
            <h2 className="mt-3 font-display text-display-md text-cream-50">
              Visit the mandir. Stay for the kirtan.
            </h2>
          </div>
          <div className="flex gap-3">
            <Button as="link" to="/visit" className="bg-saffron-500 hover:bg-saffron-600">
              Plan a Visit
            </Button>
            <Button as="link" to="/contact" variant="ghost" className="border-cream-50/30 text-cream-50 hover:border-saffron-400 hover:text-saffron-400">
              Contact Us
            </Button>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
