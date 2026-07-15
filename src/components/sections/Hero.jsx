import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Play, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button.jsx';
import { RadialLight } from '@/components/ui/RadialLight.jsx';
import { DustField } from '@/components/ui/DustField.jsx';
import { Embers } from '@/components/ui/Embers.jsx';
import { useHeroTime } from '@/hooks/useHeroTime.js';
import { useCurrentProgram } from '@/hooks/useNow.js';
import { site } from '@/lib/site.js';
import { easeDivine, staggerWords, wordRise } from '@/lib/motion.js';
import { cn } from '@/lib/cn.js';

/**
 * Home hero — the signature moment.
 *
 * v0.4 (Living Hero) rewrite. v0.7.3 Living Hero pass 2 — the deity
 * reads as alive instead of pasted onto the page, and the hero now
 * responds to scroll with movement instead of just dimming.
 *
 * Stack (bottom → top):
 *   1. Time-of-day base gradient (warm cream → deep amber → indigo)
 *   2. Deity photo, full-bleed, with intrinsic breath + scroll-driven
 *      parallax (vertical lift + horizontal sway) and mouse parallax
 *      (±6 px). Scale 1 → 1.06 across the hero, opacity holds at 1
 *      until the user is 70% out before fading.
 *   3. DustField — 44 drifting particles (cream + saffron embers,
 *      ~half twinkling). Visible at all times.
 *   4. Two ambient radial lights, breathing (24 s loop): saffron
 *      upper-center, peacock lower-right.
 *   5. Lamp bloom — saffron, upper-right, with a slow flicker overlay
 *      so the diya feels lit instead of stable.
 *   6. Embers — 14 slow rising sparks above the lamp bloom.
 *   7. Foreground mist (drift loop + scroll-thinning) so the bottom
 *      of the hero never sits static.
 *   8. Grain overlay.
 *   9. Typography: eyebrow → headline (word-rise) → subhead → CTA →
 *      live "Next darshan" tag. Headline rises ~32 px and softens
 *      opacity as the user scrolls, so the text feels like it's
 *      pulling away with the page.
 *
 * Scroll-driven:
 *   - Deity photo lifts upward and to the side at a small angle
 *     (parallax tilt) instead of just scaling.
 *   - Foreground mist thins as the user scrolls so the next section
 *     reveals underneath instead of just appearing on top.
 *   - Headline rises a bit faster than the photo so the words read
 *     as "lifting away" rather than glued to the image.
 *
 * Reduced motion:
 *   - Mouse parallax and all custom CSS animations are gated behind
 *     `prefers-reduced-motion`. Scroll transforms remain but at
 *     their full-reduce scale (translate 0 → -8 px, scale 1 → 1.02).
 */

const headline = ['ISKCON', 'Youth', 'Forum'];

function minutesUntilLabel(timeStr, bdMinutes) {
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const meridiem = m[3].toUpperCase();
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  const target = h * 60 + min;
  let diff = target - bdMinutes;
  if (diff <= 0) diff += 24 * 60;
  return diff;
}

function prettyMinutes(diff) {
  if (diff == null) return '';
  if (diff < 1) return 'moments';
  if (diff === 1) return '1 minute';
  if (diff < 60) return `${diff} minutes`;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (m === 0) return h === 1 ? '1 hour' : `${h} hours`;
  return `${h} h ${m} m`;
}

export function Hero() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { phase, gradient, deep, lampIntensity } = useHeroTime();
  const { current, next, closedTemple, bdMinutes } = useCurrentProgram();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Deity photo: lifts upward, sways slightly left, scales a touch,
  // and only fades once the user is most of the way past the hero.
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const photoX = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const photoOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.92, 1],
    [1, 1, 0.55, 0.2],
  );
  const photoRotate = useTransform(scrollYProgress, [0, 1], [0, -1.2]);

  // Foreground mist thins on scroll so the next section reveals
  // through it instead of being hidden until the hero's last frame.
  const mistOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.25]);
  const mistY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  // Headline travels further than the photo so the words read as
  // "lifting away" with the page, not glued to the image.
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    [1, 0.95, 0.55, 0.25],
  );

  // Saffron bloom drift on scroll — moves slightly so the lamp
  // catches the rising scroll motion.
  const bloomY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bloomScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Mouse parallax — bounded to ±6 px so it never feels gimmicky.
  // Layered on top of the scroll parallax for a hand-held feel.
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (prefersReduced) return undefined;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      // Normalize to [-1, 1] around viewport center.
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      targetX = -nx * 6;
      targetY = -ny * 5;
      if (!raf) raf = requestAnimationFrame(step);
    };
    const step = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      setParallax({ x: curX, y: curY });
      if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [prefersReduced]);

  // "Next darshan in 27 minutes" — find the next upcoming program
  // or, when between programs, the current live one.
  const target = current || next;
  const diff = target ? minutesUntilLabel(target.time, bdMinutes) : null;

  // Pre-compute the radial light colors based on lamp intensity.
  const saffronLight = `rgba(229,162,74,${(0.34 * lampIntensity).toFixed(3)})`;
  const peacockLight = `rgba(27,94,122,${(0.18 + 0.14 * (1 - lampIntensity)).toFixed(3)})`;

  return (
    <section
      ref={ref}
      data-phase={phase}
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink-900 text-cream-50"
    >
      {/* ----- Layer 1: time-of-day base gradient ------------------- */}
      <div
        aria-hidden
        className={cn('absolute inset-0 -z-30 bg-gradient-to-b', gradient)}
      />
      <div
        aria-hidden
        className={cn('absolute inset-0 -z-30 bg-gradient-to-t', deep)}
      />

      {/* ----- Layer 2: deity photo with mouse + scroll parallax ----- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          x: photoX,
          y: photoY,
          scale: photoScale,
          opacity: photoOpacity,
          rotate: photoRotate,
        }}
      >
        <div
          className={cn(
            'absolute inset-0 will-change-transform',
            prefersReduced ? undefined : 'anim-deity-breath',
          )}
          style={{
            transform: prefersReduced
              ? undefined
              : `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          {/* Full-bleed deity photo — edge-to-edge, no crop, no border. */}
          <img
            src="/little-1.jpg"
            alt=""
            className="h-full w-full object-cover object-center opacity-90"
          />
        </div>
      </motion.div>

      {/* ----- Layer 3: dust field --------------------------------- */}
      <div className="absolute inset-0 -z-10">
        <DustField count={44} />
      </div>

      {/* ----- Layer 4: ambient radial lights (breathing) ---------- */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 anim-breathe"
          style={{ opacity: 0.6 + 0.3 * lampIntensity }}
        >
          <RadialLight color={saffronLight} size="62%" pos="50% 22%" />
          <RadialLight color={peacockLight} size="55%" pos="82% 88%" />
        </div>

        {/* Lamp bloom — pinned upper-right. The base bloom drives
            with scroll; the flicker class adds a slow warm flicker
            so the diya feels lit instead of static. */}
        <motion.div
          aria-hidden
          className="absolute -right-20 -top-24 h-[420px] w-[420px]"
          style={{ y: bloomY, scale: bloomScale }}
        >
          <div
            className={cn(
              'absolute inset-0',
              prefersReduced ? undefined : 'anim-lamp-flicker',
            )}
          >
            <RadialLight
              color={`rgba(245,200,120,${(0.24 * lampIntensity).toFixed(3)})`}
              size="80%"
              pos="50% 50%"
            />
          </div>
        </motion.div>
      </div>

      {/* ----- Layer 5: ember sparks above the lamp ----------------- */}
      <div className="absolute inset-0 -z-10">
        <Embers count={14} />
      </div>

      {/* ----- Layer 6: foreground mist (drifts + scroll-thins) ---- */}
      <motion.div
        aria-hidden
        className={cn(
          'absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent',
          prefersReduced ? undefined : 'anim-mist-drift',
        )}
        style={{ opacity: mistOpacity, y: mistY }}
      />

      {/* ----- Layer 7: film grain --------------------------------- */}
      <div aria-hidden className="absolute inset-0 -z-10 grain opacity-12 mix-blend-overlay" />

      {/* ----- Typography + CTA ----------------------------------- */}
      <div className="container relative grid min-h-[100svh] grid-cols-1 items-end pb-24 pt-40 md:items-center md:pb-32 md:pt-44 lg:pb-40 lg:pt-52">
        <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerWords}
            className="flex flex-col"
          >
            <motion.div
              variants={wordRise}
              className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-saffron-300"
            >
              {site.legalName} · Jugaltila, Kajalshah
            </motion.div>

            <h1 className="mt-5 font-display text-display-xl text-cream-50 text-balance leading-[0.92]">
              <motion.span variants={wordRise} className="block">
                {headline[0]}
              </motion.span>
              <motion.span variants={wordRise} className="block">
                {headline[1]} {headline[2]}
              </motion.span>
              <motion.span
                variants={wordRise}
                className="block font-display italic anim-shimmer text-saffron-gradient"
              >
                Sylhet
              </motion.span>
            </h1>

            <motion.p
              variants={wordRise}
              className="mt-8 max-w-xl text-base leading-relaxed text-cream-100/85 md:text-lg"
            >
              A home for young people to learn, chant, and grow together in
              Krishna consciousness — through scripture, kirtan, and festival
              life at the heart of Sylhet.
            </motion.p>

            <motion.div
              variants={wordRise}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
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

            {/* Live "Next darshan" tag — replaces the static scroll cue
                with something the user actually wants to know. */}
            <motion.div
              variants={wordRise}
              className="mt-10 flex items-center gap-3 text-cream-100/85"
              aria-live="polite"
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-glow rounded-full bg-saffron-400" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-saffron-300" />
              </span>
              <span className="font-mono text-[0.66rem] uppercase tracking-eyebrow text-saffron-300">
                {closedTemple
                  ? 'The mandir is closed — opens at 4 AM'
                  : current
                  ? `Now at the mandir — ${current.label}`
                  : `Today's ${target?.label ?? 'darshan'} begins ${prettyMinutes(diff)}`}
              </span>
              <Sparkles size={12} className="text-saffron-300/70" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom: tiny scroll cue, fades as user starts scrolling. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.4, ease: easeDivine }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex flex-col items-center gap-3 text-cream-100/55">
            <span className="font-mono text-[0.6rem] uppercase tracking-eyebrow">
              Scroll
            </span>
            <div className="h-10 w-px bg-gradient-to-b from-cream-100/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
