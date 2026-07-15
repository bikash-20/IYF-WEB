import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/Hero.jsx';
import { TodaysDarshan } from '@/components/sections/TodaysDarshan.jsx';
import { AboutSection } from '@/components/sections/AboutSection.jsx';
import { QuickCards } from '@/components/sections/QuickCards.jsx';
import { ScheduleTimeline } from '@/components/sections/ScheduleTimeline.jsx';
import { SacredQuote } from '@/components/ui/SacredQuote.jsx';
import { TempleDivider } from '@/components/ui/TempleDivider.jsx';
import { FestivalCountdown } from '@/components/sections/FestivalCountdown.jsx';
import { EditorialGallery } from '@/components/sections/EditorialGallery.jsx';
import { MediaSection } from '@/components/sections/MediaSection.jsx';
import { VisitSection } from '@/components/sections/VisitSection.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';

/**
 * Home composition — v0.2 storytelling flow.
 *
 * Hero → TodaysDarshan (arrival moment) → About → QuickCards
 *   → TempleDivider (breathing) → SacredQuote
 *   → ScheduleTimeline → FestivalCountdown → EditorialGallery
 *   → MediaSection → VisitSection
 *
 * Rhythm: section-pad-default (big breath) wraps everything except
 * QuickCards (tight). The user scrolls through a sequenced story,
 * not a list.
 */
export function HomePage() {
  useMeta({
    title: `${site.name} — A home for young devotees`,
    description: site.description,
  });
  return (
    <motion.div {...pageEnter}>
      <Hero />
      <TodaysDarshan />
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
      <FestivalCountdown />
      <EditorialGallery />
      <MediaSection />
      <VisitSection />
    </motion.div>
  );
}
