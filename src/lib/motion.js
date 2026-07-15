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
