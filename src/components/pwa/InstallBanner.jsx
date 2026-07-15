import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useDragControls,
} from 'framer-motion';
import { Download, X, Check, Sparkles, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button.jsx';
import { cn } from '@/lib/cn.js';
import { easeDivine } from '@/lib/motion.js';

/**
 * InstallBanner — the custom IYF SYLHET "Add to Home Screen" prompt.
 *
 * v0.7.3 — interactive banner.
 *
 * Triggers:
 *   - The browser fires `beforeinstallprompt` when our PWA meets the
 *     install criteria (manifest + SW + 1+ visit). We capture and hold
 *     the event until the user is ready.
 *   - We only show the banner after a small grace delay OR once the
 *     user has shown engagement (scrolled / clicked a CTA), whichever
 *     first.
 *   - If dismissed, we remember for 7 days via localStorage so the
 *     banner doesn't nag.
 *
 * States (rendered by `phase`):
 *   - 'install' → "Add IYF SYLHET to your home screen" + Install CTA
 *   - 'success' → "Installed. The mandir is on your home screen now."
 *   - null      → nothing rendered (browser doesn't support PWA / user
 *                 is already in standalone mode / dismissed)
 *
 * Interaction (v0.7.3):
 *   - The whole card is grabbable on desktop (mouse) and mobile (touch).
 *   - Dragging uses Framer Motion's `drag` with elastic bounds and
 *     a soft spring on release.
 *   - The banner's resting position is persisted in localStorage so
 *     it comes back where the user left it next time.
 *   - On idle, the banner floats with a slow ambient sway so it
 *     feels alive without ever moving far from its anchor.
 */
const DISMISS_KEY = 'iyf-install-dismissed-at';
const POS_KEY = 'iyf-install-banner-pos';
const DISMISS_DAYS = 7;

// Resting bounds — the banner starts anchored bottom-center. We keep
// the drag area inside the viewport but with a generous elastic range.
const RESTING = { x: 0, y: 0 };

function shouldShow() {
  if (typeof window === 'undefined') return false;
  try {
    const ts = localStorage.getItem(DISMISS_KEY);
    if (!ts) return true;
    const elapsed = Date.now() - parseInt(ts, 10);
    return elapsed > DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

function rememberDismiss() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

function loadPos() {
  if (typeof window === 'undefined') return RESTING;
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (!raw) return RESTING;
    const parsed = JSON.parse(raw);
    const x = Number(parsed?.x);
    const y = Number(parsed?.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return RESTING;
    // Defensive cap — never restore off-screen.
    const limit = Math.max(window.innerWidth, window.innerHeight);
    if (Math.abs(x) > limit || Math.abs(y) > limit) return RESTING;
    return { x, y };
  } catch {
    return RESTING;
  }
}

function savePos(pos) {
  try {
    localStorage.setItem(POS_KEY, JSON.stringify(pos));
  } catch {
    /* ignore */
  }
}

// Standalone already? (iOS / Android PWAs set this when launched.)
function isInApp() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

export function InstallBanner() {
  const [deferred, setDeferred] = useState(null);
  const [phase, setPhase] = useState(null); // 'install' | 'success' | null
  const [visible, setVisible] = useState(false);

  const prefersReduced = useReducedMotion();

  // Position lives in MotionValues so dragging stays at 60fps and we
  // can persist on drag-end without re-rendering every frame.
  const x = useMotionValue(loadPos().x);
  const y = useMotionValue(loadPos().y);
  const lastPos = useRef(loadPos());
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isInApp()) return undefined;

    const onBefore = (e) => {
      // Suppress the browser's mini-bar; we render our own.
      e.preventDefault();
      setDeferred(e);
      setPhase((p) => p || 'install');
    };
    const onInstalled = () => {
      setPhase('success');
      setDeferred(null);
      // Reset to anchor so the success message sits where the
      // install prompt did.
      x.set(0);
      y.set(0);
      // Auto-hide the success message after 8s.
      setTimeout(() => setVisible(false), 8000);
    };

    window.addEventListener('beforeinstallprompt', onBefore);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBefore);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [x, y]);

  // Reveal logic — appears after a 4s grace OR on first scroll / click,
  // whichever fires first. (We don't want a banner to flash in
  // instantly.)
  useEffect(() => {
    if (!phase || phase === 'success') return undefined;
    if (!shouldShow()) return undefined;

    let timer = null;
    const reveal = () => {
      timer = setTimeout(() => setVisible(true), 400);
      cleanup();
    };
    const onScroll = () => reveal();
    const onClick = () => reveal();

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
      window.removeEventListener('click', onClick);
    };

    // Listen for engagement; the grace timer kicks in either way.
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('click', onClick, { once: true });
    timer = setTimeout(reveal, 4000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [phase]);

  // Hide for 7 days when the user dismisses.
  const dismiss = () => {
    setVisible(false);
    rememberDismiss();
  };

  // Trigger the native install dialog.
  const triggerInstall = async () => {
    if (!deferred) return;
    try {
      deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === 'dismissed') {
        dismiss();
      }
      setDeferred(null);
    } catch {
      dismiss();
    }
  };

  const onDragEnd = () => {
    const pos = { x: x.get(), y: y.get() };
    lastPos.current = pos;
    savePos(pos);
    setIsDragging(false);
  };

  // The banner stays anchored bottom-center via the wrapper; the
  // card itself is what the user grabs and drags around the screen.
  // We give it a generous elastic drag region so it can be pulled
  // out of the way of other content but won't fly off-screen.
  const dragConstraints = {
    top: -(typeof window !== 'undefined' ? window.innerHeight : 800) * 0.7,
    bottom: 120,
    left: -(typeof window !== 'undefined' ? window.innerWidth : 1280) * 0.45,
    right: (typeof window !== 'undefined' ? window.innerWidth : 1280) * 0.45,
  };

  return (
    <AnimatePresence>
      {phase && visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={phase === 'install' ? 'Install IYF SYLHET' : 'IYF SYLHET installed'}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.7, ease: easeDivine }}
          className={cn(
            'fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-md',
            'sm:inset-x-6 sm:bottom-6',
            // Disable the OS touch-action interception so we can
            // actually drag on mobile (otherwise vertical pans
            // fight with our drag gesture).
            isDragging ? 'touch-none' : 'pointer-events-none',
          )}
        >
          {/* Pointer-events live on this inner wrapper so the user can
              drag anywhere on the card (not just the grip). */}
          <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={dragConstraints}
            dragElastic={0.18}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={onDragEnd}
            style={{ x, y }}
            whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
            className="pointer-events-auto cursor-grab active:cursor-grabbing"
          >
            <motion.div
              // Idle ambient float — the banner breathes a little so
              // it feels alive between user interactions. Disabled
              // when the user prefers reduced motion or while dragging.
              animate={
                isDragging || prefersReduced
                  ? { rotate: 0, y: 0 }
                  : {
                      rotate: [0, -0.6, 0.4, 0],
                      y: [0, -2, 1, 0],
                    }
              }
              transition={{
                duration: 7,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
              }}
              className={cn(
                'relative overflow-hidden rounded-editorial border bg-cream-50/95 shadow-temple backdrop-blur-md transition-shadow',
                isDragging ? 'shadow-temple ring-1 ring-saffron-400/40' : '',
                phase === 'success'
                  ? 'border-saffron-300/40'
                  : 'border-temple-800/10',
              )}
              onPointerDownCapture={(e) => {
                // Start the drag from anywhere on the card so the
                // user doesn't have to hunt for the grip — but
                // ignore clicks that land on an actual interactive
                // child (buttons / links) so they still work.
                const target = e.target;
                if (target instanceof HTMLElement) {
                  const interactive = target.closest(
                    'button, a, input, textarea, [role="button"]',
                  );
                  if (interactive) return;
                }
                dragControls.start(e);
              }}
            >
              {/* warm gradient gleam */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    'radial-gradient(120% 80% at 0% 0%, rgba(245,185,107,0.20) 0%, rgba(245,185,107,0) 50%), radial-gradient(120% 80% at 100% 100%, rgba(232,162,74,0.10) 0%, rgba(232,162,74,0) 55%)',
                }}
              />

              <div className="flex gap-4 p-4 pr-10 sm:p-5">
                <IconBadge phase={phase} />

                <div className="min-w-0 flex-1">
                  {phase === 'install' ? (
                    <>
                      <div className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-700">
                        PWA · Install
                      </div>
                      <h3 className="mt-1 font-display text-lg leading-snug text-temple-900">
                        Add <span className="italic">IYF SYLHET</span> to your home screen
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-temple-700/85">
                        A quiet little app for darshan, the daily schedule, and festivals —
                        opens in one tap, works offline.
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <Button onClick={triggerInstall} size="sm" aria-label="Install the app">
                          <Download size={14} />
                          Install
                        </Button>
                        <button
                          onClick={dismiss}
                          className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-temple-600 transition-colors hover:text-temple-800"
                        >
                          Not now
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-saffron-700">
                        Installed
                      </div>
                      <h3 className="mt-1 font-display text-lg leading-snug text-temple-900">
                        The mandir is on your home screen now.
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-temple-700/85">
                        Look for the IYF SYLHET icon — daily darshan is one tap away.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Drag handle — visible affordance. The whole card is
                  grabbable but this hint says so. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-temple-800/5 text-temple-700/55"
              >
                <GripVertical size={11} />
              </span>

              <button
                onClick={dismiss}
                aria-label="Dismiss install banner"
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-temple-700/70 transition-colors hover:bg-temple-800/5 hover:text-temple-900"
              >
                <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconBadge({ phase }) {
  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-saffron-300/40 bg-cream-50 shadow-soft sm:h-14 sm:w-14">
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
        <defs>
          <clipPath id="badge-eye">
            <circle cx="32" cy="28" r="16" />
          </clipPath>
        </defs>
        <image
          href="/jagannath%20eye.jpeg"
          x="16"
          y="12"
          width="32"
          height="32"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#badge-eye)"
        />
        <circle cx="32" cy="28" r="16" fill="none" stroke="rgba(217,138,43,0.55)" strokeWidth="1.5" />
      </svg>
      {phase === 'success' ? (
        <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-saffron-500 text-cream-50 shadow-soft">
          <Check size={11} />
        </span>
      ) : (
        <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cream-50 text-saffron-500 shadow-soft">
          <Sparkles size={11} />
        </span>
      )}
    </div>
  );
}