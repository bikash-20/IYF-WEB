// Shared Framer Motion variants. Keep them dumb and composable so
// they can be reused across the app without each section redefining
// the same easing.

export const easeDivine = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeDivine } },
};

export const fadeUpSm = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeDivine } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: easeDivine } },
};

export const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
});

// Slow word-by-word stagger used in the hero (ISKCON → Youth → Forum → Sylhet).
// Children are motion elements with the `wordRise` variant below.
export const staggerWords = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

export const wordRise = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: easeDivine } },
};

export const pageEnter = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeDivine } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: easeDivine } },
};

// "Arrival" transition — a longer, calmer fade-up used for the first
// non-hero section so the user feels they have stepped inside.
export const arrival = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: easeDivine } },
};

// Per-section timing tokens — every major block of the home page
// has its own emotional pace, so they animate at different speeds.
//   hero   — slow & cinematic (1.2s) so the deity has time to land
//   about  — confident mid-pace (0.8s) for personal storytelling
//   cards  — quick & responsive (0.55s) for tactile interactivity
//   gallery — slightly slower than cards (0.7s) for editorial weight
//   quote  — the slowest (1.4s), so the words feel like scripture
export const heroTiming = {
  duration: 1.2,
  ease: easeDivine,
};
export const aboutTiming = {
  duration: 0.8,
  ease: easeDivine,
};
export const cardTiming = {
  duration: 0.55,
  ease: easeDivine,
};
export const galleryTiming = {
  duration: 0.7,
  ease: easeDivine,
};
export const quoteTiming = {
  duration: 1.4,
  ease: easeDivine,
};

// Variants for each section that can be dropped onto a <motion.div>.
// Each fades children with the section's own duration.
export const heroFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: easeDivine } },
};
export const aboutFade = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeDivine } },
};
export const cardFade = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeDivine } },
};
export const galleryFade = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeDivine } },
};
export const quoteFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: easeDivine } },
};
