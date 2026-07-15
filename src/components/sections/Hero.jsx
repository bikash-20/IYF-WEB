import { motion } from 'framer-motion';
import { Play, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { site } from '@/lib/site.js';
import { easeDivine, staggerWords, wordRise } from '@/lib/motion.js';

/**
 * Home hero — the signature moment.
 *
 * v0.2 changes:
 *   - Cinematic atmosphere: dark transparent + warm saffron radial + grain
 *   - Deity is no longer cropped — `object-position: center 25%` so Krishna
 *     has vertical room to breathe
 *   - Headline staggers word-by-word: ISKCON → Youth → Forum → Sylhet
 *   - Final word "Sylhet" uses cream → saffron gradient
 *   - Subhead and CTAs animate in with longer delays so the eye lands on
 *     the words first, not the buttons
 */
const headline = ['ISKCON', 'Youth', 'Forum'];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 text-cream-50">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {/* Uncropped deity photo */}
        <img
          src="/little-1.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[center_25%] opacity-75"
        />
        {/* Dark transparent veil — let the warmth come through */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 70% at 50% 50%, rgba(15,13,20,0.35) 0%, rgba(15,13,20,0.75) 75%, rgba(15,13,20,0.92) 100%)',
          }}
        />
        {/* Warm saffron glow — upper third */}
        <RadialLight
          color="rgba(229,162,74,0.35)"
          size="60%"
          pos="50% 18%"
          className="!relative inset-0 h-full w-full"
        />
        {/* Subtle peacock warmth — lower right */}
        <RadialLight
          color="rgba(27,94,122,0.20)"
          size="55%"
          pos="85% 90%"
          className="!relative inset-0 h-full w-full"
        />
        {/* Film grain */}
        <div className="absolute inset-0 grain opacity-15 mix-blend-overlay" />
      </div>

      <div className="container relative grid min-h-[92vh] grid-cols-1 items-end py-28 md:min-h-screen md:items-center md:py-32 lg:py-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerWords}
          className="max-w-4xl"
        >
          <motion.div
            variants={wordRise}
            className="font-mono text-[0.72rem] uppercase tracking-eyebrow text-saffron-400"
          >
            {site.legalName} · Jugaltila, Kajalshah
          </motion.div>

          <h1 className="mt-6 font-display text-display-xl text-cream-50 text-balance leading-[0.92]">
            <motion.span variants={wordRise} className="block">
              {headline[0]}
            </motion.span>
            <motion.span variants={wordRise} className="block">
              {headline[1]} {headline[2]}
            </motion.span>
            <motion.span variants={wordRise} className="block text-saffron-gradient">
              Sylhet
            </motion.span>
          </h1>

          <motion.p
            variants={wordRise}
            className="mt-10 max-w-xl text-base leading-relaxed text-cream-100/85 md:text-lg"
          >
            A home for young people to learn, chant, and grow together in Krishna consciousness —
            through scripture, kirtan, and festival life at the heart of Sylhet.
          </motion.p>

          <motion.div variants={wordRise} className="mt-10 flex flex-wrap items-center gap-3">
            <Button as="link" to="/visit" size="lg">
              <MapPin size={14} />
              Visit the Temple
            </Button>
            <Button
              as="a"
              href={site.contacts.youtube}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="ghost"
              className="border-cream-50/30 text-cream-50 hover:border-saffron-400 hover:text-saffron-300"
            >
              <Play size={14} />
              Watch Live Darshan
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.4, ease: easeDivine }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex flex-col items-center gap-3 text-cream-100/70">
            <span className="font-mono text-[0.65rem] uppercase tracking-eyebrow">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-cream-100/70 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
