import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/Hero.jsx';
import { QuickCards } from '@/components/sections/QuickCards.jsx';
import { AboutSection } from '@/components/sections/AboutSection.jsx';
import { BeSmartSection } from '@/components/sections/BeSmartSection.jsx';
import { ScheduleTimeline } from '@/components/sections/ScheduleTimeline.jsx';
import { MediaSection } from '@/components/sections/MediaSection.jsx';
import { VisitSection } from '@/components/sections/VisitSection.jsx';
import { useMeta } from '@/hooks/useMeta.js';
import { pageEnter } from '@/lib/motion.js';
import { site } from '@/lib/site.js';

export function HomePage() {
  useMeta({
    title: `${site.name} — A home for young devotees`,
    description: site.description,
  });
  return (
    <motion.div {...pageEnter}>
      <Hero />
      <QuickCards />
      <AboutSection />
      <BeSmartSection />
      <ScheduleTimeline />
      <MediaSection />
      <VisitSection />
    </motion.div>
  );
}
