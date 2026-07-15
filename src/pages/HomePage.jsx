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
 * Home composition — v0.3 storytelling flow.
 *
 * Hero → TodaysTemple (live schedule + thought + verse + festival
 *   countdown, all in one editorial layer) → About → QuickCards
 *   → TempleDivider → SacredQuote → ScheduleTimeline
 *   → EditorialGallery → Media → Visit
 *
 * Rhythm: section-pad-default wraps everything except QuickCards
 * (tight). The festival countdown is collapsed inside TodaysTemple
 * so the page reads as a single temple day, not a list of sections.
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

      <TempleDivider label="On hearing the holy names" />

      <SacredQuote
        text="Chant the holy names of Krishna — Hare Krishna Hare Krishna, Krishna Krishna Hare Hare — and your heart will be purified."
        source="Sri Chaitanya Mahaprabhu · Adi Purana"
        imageSrc="/little-1.jpg"
        imageAlt="Sri Sri Radh Madhava in lamplight"
      />

      <ScheduleTimeline />
      <EditorialGallery />
      <MediaSection />
      <VisitSection />
    </motion.div>
  );
}
