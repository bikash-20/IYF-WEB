import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button.jsx';
import { site } from '@/lib/site.js';
import { easeDivine } from '@/lib/motion.js';

/**
 * Home hero. `little-1.jpg` (the dark, dramatic photo) is the
 * signature image — it carries the page. A subtle radial glow and
 * grain keep the background feeling devotional rather than
 * photographic.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 text-cream-50">
      <div className="absolute inset-0 -z-10">
        <img
          src="/little-1.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 30%, rgba(0,0,0,0) 0%, rgba(15,13,20,0.55) 60%, rgba(15,13,20,0.9) 100%)',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 mix-blend-screen opacity-30"
          style={{
            background:
              'radial-gradient(40% 40% at 50% 35%, rgba(217,138,43,0.55) 0%, rgba(217,138,43,0) 70%)',
          }}
          aria-hidden
        />
      </div>

      <div className="container relative grid min-h-[88vh] grid-cols-1 items-center py-20 md:min-h-[92vh] md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeDivine }}
          className="max-w-3xl"
        >
          <div className="font-mono text-[0.72rem] uppercase tracking-eyebrow text-saffron-400">
            {site.legalName} · Jugaltila, Kajalshah
          </div>

          <h1 className="mt-5 font-display text-display-xl text-balance leading-[0.95] text-cream-50">
            ISKCON Youth<br />
            Forum, <em className="text-saffron-400 not-italic">Sylhet</em>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-cream-100/80 md:text-lg">
            A home for young people to learn, chant, and grow together in Krishna consciousness —
            through scripture, kirtan, and festival life at the heart of Sylhet.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button as="link" to="/visit" size="lg" className="bg-saffron-500 hover:bg-saffron-600">
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
              className="border-cream-50/30 text-cream-50 hover:border-saffron-400 hover:text-saffron-400"
            >
              <Play size={14} />
              Watch Live Darshan
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex flex-col items-center gap-2 text-cream-100/60">
            <span className="font-mono text-[0.65rem] uppercase tracking-eyebrow">Scroll</span>
            <div className="h-10 w-px bg-gradient-to-b from-cream-100/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
