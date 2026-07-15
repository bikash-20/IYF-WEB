import { motion } from 'framer-motion';
import { Heart, BookOpen, Utensils, Users } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero.jsx';
import { Section, Container } from '@/components/ui/Section.jsx';
import { SectionHeading } from '@/components/ui/SectionHeading.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';

const causes = [
  { icon: Utensils, k: 'Prasadam', body: 'Daily vegetarian offerings for the congregation and visitors.' },
  { icon: BookOpen, k: 'Scripture & classes', body: 'Srimad Bhagavatam, Bhagavad-gita, and youth courses like Be SMART.' },
  { icon: Users, k: 'Youth outreach', body: 'Volunteer-led kirtan nights, retreats, and festival programmes.' },
  { icon: Heart, k: 'Temple upkeep', body: 'Maintenance of the mandir, deities, and grounds at Jugaltila, Kajalshah.' },
];

export function DonatePage() {
  useMeta({
    title: `Donate — ${site.name}`,
    description: 'Support daily worship, scripture classes, and youth outreach at the mandir.',
  });

  return (
    <motion.div {...pageEnter}>
      <PageHero
        breadcrumb="Donate"
        eyebrow="Support the mandir"
        title="Give to the temple"
        description="Your contribution keeps daily worship, scripture classes, prasadam, and youth programmes running at Sri Sri Radh Madhava Mandir."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Where it goes"
            title="Four places your offering lands"
            lede="Every donation, however small, supports a specific part of life at the mandir."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {causes.map((c, i) => (
              <RevealOnScroll key={c.k} delay={i * 0.05}>
                <div className="rounded-xl2 border border-temple-800/10 bg-cream-50 p-6">
                  <c.icon size={20} className="text-saffron-600" />
                  <h3 className="mt-4 font-display text-xl text-temple-800">{c.k}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-temple-700/80">{c.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="deep">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-400">
              Ready to give
            </div>
            <h2 className="mt-3 font-display text-display-md text-cream-50">
              Talk to the temple team
            </h2>
            <p className="mt-3 text-cream-100/80">
              Online donation isn't wired up yet. Reach out and we'll walk you through bank transfer, in-person offering, or sponsorship of a specific seva.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button as="link" to="/contact" className="bg-saffron-500 hover:bg-saffron-600">
              Get in Touch
            </Button>
            <Button
              as="a"
              href={site.contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="border-cream-50/30 text-cream-50 hover:border-saffron-400 hover:text-saffron-400"
            >
              WhatsApp
            </Button>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
