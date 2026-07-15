import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/Hero.jsx';
import { TodaysTemple } from '@/components/sections/TodaysTemple.jsx';
import { AboutSection } from '@/components/sections/AboutSection.jsx';
import { QuickCards } from '@/components/sections/QuickCards.jsx';
import { ScheduleTimeline } from '@/components/sections/ScheduleTimeline.jsx';
import { SacredQuote } from '@/components/ui/SacredQuote.jsx';
import { TempleDivider } from '@/components/ui/TempleDivider.jsx';
import { EditorialGallery } from '@/components/sections/EditorialGallery.jsx';
import { MediaSection } from '@/components/sections/MediaSection.jsx';
import { VisitSection } from '@/components/sections/VisitSection.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';

/**
 * Home composition — v0.4 storytelling flow.
 *
 * Hero → TodaysTemple (live schedule + thought + verse + festival
 *   countdown, all in one editorial layer) → About → QuickCards
 *   → TempleDivider(bell) → SacredQuote → ScheduleTimeline
 *   → TempleDivider(lotus) → EditorialGallery
 *   → TempleDivider(peacock) → Media → Visit
 *
 * Three different divider motifs give each transition its own
 * micro-personality so visitors feel they're moving through
 * different rooms rather than the same hall on repeat.
 */
export function HomePage() {
  useMeta({
    title: `${site.name} — A home for young devotees`,
    description: site.description,
  });
  return (
    <motion.div {...pageEnter}>
      <Hero />
      <TodaysTemple />
      <AboutSection />
      <QuickCards />

      <TempleDivider label="On hearing the holy names" motif="bell" />

      <SacredQuote
        text="Chant the holy names of Krishna — Hare Krishna Hare Krishna, Krishna Krishna Hare Hare — and your heart will be purified."
        source="Sri Chaitanya Mahaprabhu · Adi Purana"
        imageSrc="/little-1.jpg"
        imageAlt="Sri Sri Radh Madhava in lamplight"
      />

      <ScheduleTimeline />

      <TempleDivider label="Light, lotus, and the long road" motif="lotus" />

      <EditorialGallery />

      <TempleDivider label="Come see for yourself" motif="peacock" />

      <MediaSection />
      <VisitSection />
    </motion.div>
  );
}
