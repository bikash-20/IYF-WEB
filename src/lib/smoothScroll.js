// Heavy, lerped, momentum-based scroll engine.
//
// Drives the page through a virtual position so wheel/trackpad/touch
// inputs glide instead of snapping. Mirrors the pattern Lenis and
// similar libraries use, but condensed to ~250 lines and gated behind
// `prefers-reduced-motion` so users who opt out get native scroll.
//
// Public API:
//   const scroll = getSmoothScroll();
//   scroll.start() / scroll.destroy()
//   scroll.y / scroll.targetY / scroll.maxY / scroll.progress
//   scroll.scrolling  // true while still gliding
//   scroll.scrollTo(y, { duration })
//   scroll.on('scroll' | 'momentum', fn) → unsubscribe
//
// The engine never calls `window.scrollTo` while enabled; it instead
// applies `transform: translate3d(0,-y,0)` to <body>'s first child and
// locks native scroll on <html>. While enabled, every rAF frame fires
// a synthetic `Event('scroll')` on window so existing listeners
// (useScrolled, etc.) keep working untouched. The IntersectionObserver
// in App.jsx measures layout rects, so it also keeps working.
//
// Behaviour:
//   - Wheel:        deltaY accumulated into targetY per frame.
//                   Per-frame lerp ~0.085 ⇒ ~1.3s glide after release.
//   - Trackpad:     same code path; macOS already produces many small
//                   deltaY events with momentum, so the page picks up
//                   the trackpad's own momentum naturally.
//   - Touch:        1:1 finger tracking during touchmove; on touchend
//                   the residual finger velocity (decayed) keeps the
//                   page gliding for ~1.8s before settling.
//   - Keyboard:     arrow / pgup / pgdn / home / end routed through
//                   scrollTo with a 280ms ease.
//   - scrollTo:     programmatic tween using easeOutExpo — same curve
//                   ScrollToTop uses, so route transitions stay native
//                   to the motion vocabulary.
//   - Anchor links: clicks on `a[href^="#"]` intercepted and routed
//                   through scrollTo, otherwise native scroll is
//                   locked and the browser would no-op.
//   - Form fields:  wheel/touch on inputs/textareas/contenteditable
//                   bypasses the engine so inner scrolling still works.
//   - Reduced motion: engine never mounts. scrollTo() falls through to
//                   window.scrollTo(behavior: 'instant' | 'smooth').
//                   Runtime toggle FROM native → reduced: we tear down
//                   the engine and restore native scroll. We do NOT
//                   re-mount if reduced gets disabled mid-session —
//                   mid-flight re-mounts would jump the page.

const EASE_OUT_EXPO = (t) => 1 - Math.pow(2, -10 * t);
const LERP = 0.085;            // ~1.3s glide half-life at 60fps after release
const TOUCH_LERP = 1.0;        // finger tracking: 1:1 with the finger
const WHEEL_LERP = 1.0;        // wheel → target is direct, no extra lag
const MOMENTUM_EPSILON = 0.1;  // px/frame below which momentum is "settled"
const TINY_EPSILON = 0.05;     // px below which target snaps to current

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

class SmoothScroll {
  constructor() {
    this.y = 0;
    this.targetY = 0;
    this.velocity = 0;
    this.maxY = 0;
    this.tween = null;
    this.enabled = false;
    this.mounted = false;
    this.handlers = { scroll: new Set(), momentum: new Set() };
    this._listeners = [];
    this._mediaQuery = null;
    this._mediaListener = null;
    this._lastTouchY = 0;
    this._touchActive = false;
    this._touchVelocitySamples = [];
    this._rafId = 0;
    this._wrapperEl = null;
    this._resizeRaf = 0;
    this._mutationObserver = null;
  }

  // ---------- lifecycle ----------------------------------------------------

  start() {
    if (this.mounted) return;
    if (typeof window === 'undefined') return;
    this._mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    this._syncEnabledFromMedia();
    // React to a runtime toggle where reduced-motion gets enabled.
    if (this._mediaQuery && this._mediaQuery.addEventListener) {
      this._mediaListener = (e) => {
        if (e.matches && this.enabled) this._teardown();
      };
      this._mediaQuery.addEventListener('change', this._mediaListener);
    }
    if (!this.enabled) return; // bypass path

    this._lockLayout();
    // Force native scroll back to 0 so the engine's translate is the
    // single source of truth for content offset. Without this, a user
    // who reloaded the page mid-scroll would see a momentary jump as
    // the wrapper snaps to translate(0,0) while the browser still
    // remembers its scroll offset.
    try { window.scrollTo(0, 0); } catch { /* noop */ }
    this._measure();
    // Start at y=0. We don't try to restore native scrollY on mount
    // because (a) the layout lock happens at the same time as our
    // transform application, and there's no clean way to translate
    // content from the browser's saved scroll position without a
    // visible snap, and (b) React Router's SPA navigation keeps the
    // engine mounted, so back/forward within the app preserves
    // scroll naturally. A page reload is treated as a fresh start.
    this.y = 0;
    this.targetY = 0;

    this._attach();
    // Watch for content height changes (route transitions, image
    // loads, fonts loading) and remeasure. Without this, maxY would
    // be stale after navigating to a longer/shorter page.
    if (typeof MutationObserver !== 'undefined') {
      // childList only — watching style/class would fire every time
      // framer-motion writes a transform (60Hz during scroll), which
      // would race with the rAF loop just to call _measure(). New
      // mounted children are the only signal that matters for maxY.
      this._mutationObserver = new MutationObserver(() => {
        if (this._resizeRaf) return;
        this._resizeRaf = requestAnimationFrame(() => {
          this._resizeRaf = 0;
          this._measure();
        });
      });
      this._mutationObserver.observe(this._wrapperEl || document.body, {
        childList: true,
        subtree: true,
      });
    }

    this._rafId = requestAnimationFrame(this._loop);
    this.mounted = true;
  }

  destroy() {
    if (!this.mounted) return;
    this._unattach();
    this._unlockLayout();
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
      this._mutationObserver = null;
    }
    if (this._mediaListener && this._mediaQuery?.removeEventListener) {
      this._mediaQuery.removeEventListener('change', this._mediaListener);
    }
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this._rafId = 0;
    this.mounted = false;
  }

  _syncEnabledFromMedia() {
    this.enabled = !this._mediaQuery?.matches;
  }

  _teardown() {
    // Tore down because reduced-motion was enabled mid-session.
    this._unattach();
    this._unlockLayout();
    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
      this._mutationObserver = null;
    }
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this._rafId = 0;
    this.enabled = false;
    this.mounted = false;
  }

  // ---------- layout lock -------------------------------------------------

  _lockLayout() {
    document.documentElement.classList.add('smooth-scroll-locked');
    // The wrapper is the element that receives the translateY. We use
    // a single data-attribute lookup so Layout owns the seam — adding
    // `data-scroll-content` to a div that wraps <main> + <Footer>
    // keeps the navbar in body flow (where sticky behaves as fixed
    // because body is the scrolling container, with overflow hidden).
    this._wrapperEl = document.querySelector('[data-scroll-content]');
    if (!this._wrapperEl) {
      // Fallback: translate the body. Sticky elements inside the body
      // will scroll off — only safe if there are none.
      this._wrapperEl = document.body;
    }
    // Force layout to settle before reading height.
    void this._wrapperEl.offsetHeight;
    this._wrapperEl.style.willChange = 'transform';
  }

  _unlockLayout() {
    document.documentElement.classList.remove('smooth-scroll-locked');
    if (this._wrapperEl) {
      this._wrapperEl.style.transform = '';
      this._wrapperEl.style.willChange = '';
      this._wrapperEl = null;
    }
  }

  _measure() {
    // Document height minus viewport height = max scroll. We measure
    // off the wrapper element's scrollHeight when it's a wrapper
    // (otherwise translating it could clip), and fall back to the
    // documentElement when body is the wrapper.
    let docHeight;
    if (this._wrapperEl && this._wrapperEl !== document.body) {
      docHeight = this._wrapperEl.scrollHeight;
    } else {
      docHeight = document.documentElement.scrollHeight;
    }
    const winHeight = window.innerHeight || document.documentElement.clientHeight;
    this.maxY = Math.max(0, docHeight - winHeight);
    this.targetY = clamp(this.targetY, 0, this.maxY);
    this.y = clamp(this.y, 0, this.maxY);
  }

  // ---------- event handling ----------------------------------------------

  _onWheel = (e) => {
    if (!this.enabled) return;
    // Let form fields handle their own wheel scroll.
    if (e.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    e.preventDefault();
    this._cancelTween();
    // deltaMode 0 = pixels, 1 = lines, 2 = pages. Normalise to px.
    let dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    else if (e.deltaMode === 2) dy *= winHeight();
    this.targetY = clamp(this.targetY + dy * WHEEL_LERP, 0, this.maxY);
  };

  _onTouchStart = (e) => {
    if (!this.enabled) return;
    if (e.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    if (e.touches.length !== 1) return;
    this._cancelTween();
    this._touchActive = true;
    this._lastTouchY = e.touches[0].clientY;
    this._touchVelocitySamples = [];
  };

  _onTouchMove = (e) => {
    if (!this.enabled || !this._touchActive) return;
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const y = e.touches[0].clientY;
    const dy = this._lastTouchY - y;
    this._lastTouchY = y;
    this.targetY = clamp(this.targetY + dy * TOUCH_LERP, 0, this.maxY);
    // Sample velocity over a short window so touchend can pick it up.
    const now = performance.now();
    this._touchVelocitySamples.push({ dy, t: now });
    while (this._touchVelocitySamples.length > 0 && now - this._touchVelocitySamples[0].t > 80) {
      this._touchVelocitySamples.shift();
    }
  };

  _onTouchEnd = () => {
    if (!this.enabled || !this._touchActive) return;
    this._touchActive = false;
    // Convert sampled velocity (px per ~80ms) into a one-shot push on
    // targetY. We let the rAF loop's lerp then naturally carry the page
    // further for ~1.8s before settling.
    if (this._touchVelocitySamples.length >= 2) {
      const first = this._touchVelocitySamples[0];
      const last = this._touchVelocitySamples[this._touchVelocitySamples.length - 1];
      const dt = Math.max(1, last.t - first.t);
      const totalDy = this._touchVelocitySamples.reduce((s, s2) => s + s2.dy, 0);
      const v = (totalDy / dt) * 16; // px per ~16ms frame
      // Bias so a flick carries ~3× the per-frame velocity into the future.
      this.targetY = clamp(this.targetY + v * 3.0, 0, this.maxY);
    }
    this._touchVelocitySamples = [];
  };

  _onKey = (e) => {
    if (!this.enabled) return;
    // Don't hijack typing in form fields.
    if (e.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    const h = window.innerHeight || 800;
    const step = e.shiftKey ? h : 80;
    switch (e.key) {
      case 'ArrowDown':
        this.targetY = clamp(this.targetY + step, 0, this.maxY);
        e.preventDefault();
        break;
      case 'ArrowUp':
        this.targetY = clamp(this.targetY - step, 0, this.maxY);
        e.preventDefault();
        break;
      case 'PageDown':
        this.targetY = clamp(this.targetY + h * 0.85, 0, this.maxY);
        e.preventDefault();
        break;
      case 'PageUp':
        this.targetY = clamp(this.targetY - h * 0.85, 0, this.maxY);
        e.preventDefault();
        break;
      case 'Home':
        this.scrollTo(0, { duration: 320 });
        e.preventDefault();
        break;
      case 'End':
        this.scrollTo(this.maxY, { duration: 320 });
        e.preventDefault();
        break;
      case ' ': // space — page-down feel
        this.targetY = clamp(this.targetY + h * 0.7, 0, this.maxY);
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  _onClickAnchor = (e) => {
    if (!this.enabled) return;
    // Find a clicked anchor with an in-page hash.
    const a = e.target?.closest?.('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    let id;
    try {
      id = decodeURIComponent(href.slice(1));
    } catch {
      return;
    }
    const target = id === 'main' ? document.getElementById('main') : document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const rect = target.getBoundingClientRect();
    const targetY = clamp(this.y + rect.top - 24, 0, this.maxY);
    this.scrollTo(targetY, { duration: 560 });
  };

  _onResize = () => {
    if (this._resizeRaf) return;
    this._resizeRaf = requestAnimationFrame(() => {
      this._resizeRaf = 0;
      this._measure();
    });
  };

  // ---------- listeners ---------------------------------------------------

  _attach() {
    const opts = { passive: false };
    window.addEventListener('wheel', this._onWheel, opts);
    window.addEventListener('touchstart', this._onTouchStart, { passive: true });
    window.addEventListener('touchmove', this._onTouchMove, opts);
    window.addEventListener('touchend', this._onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', this._onTouchEnd, { passive: true });
    window.addEventListener('keydown', this._onKey);
    window.addEventListener('click', this._onClickAnchor, true);
    window.addEventListener('resize', this._onResize);
    this._listeners.push(
      ['wheel', this._onWheel, opts],
      ['touchstart', this._onTouchStart, { passive: true }],
      ['touchmove', this._onTouchMove, opts],
      ['touchend', this._onTouchEnd, { passive: true }],
      ['touchcancel', this._onTouchEnd, { passive: true }],
      ['keydown', this._onKey],
      ['click', this._onClickAnchor, true],
      ['resize', this._onResize],
    );
  }

  _unattach() {
    for (const [type, fn, opts] of this._listeners) {
      window.removeEventListener(type, fn, opts);
    }
    this._listeners = [];
  }

  // ---------- rAF loop ----------------------------------------------------

  _loop = () => {
    if (!this.enabled || !this.mounted) return;
    let prevY = this.y;

    if (this.tween) {
      const elapsed = performance.now() - this.tween.startTime;
      const t = clamp(elapsed / this.tween.duration, 0, 1);
      const eased = EASE_OUT_EXPO(t);
      this.y = this.tween.from + (this.tween.to - this.tween.from) * eased;
      if (t >= 1) {
        this.y = this.tween.to;
        this.tween = null;
      }
    } else {
      const diff = this.targetY - this.y;
      this.y += diff * LERP;
    }

    // Snap target to current if we're effectively there, so we stop
    // gliding at the edges.
    if (Math.abs(this.targetY - this.y) < TINY_EPSILON) {
      this.targetY = this.y;
    }

    // Clamp.
    this.y = clamp(this.y, 0, this.maxY);
    this.targetY = clamp(this.targetY, 0, this.maxY);

    // Apply.
    if (this._wrapperEl) {
      this._wrapperEl.style.transform = `translate3d(0, ${-this.y.toFixed(2)}px, 0)`;
    }

    // Publish.
    this.velocity = this.y - prevY;
    this.progress = this.maxY > 0 ? this.y / this.maxY : 0;
    this.scrolling = Math.abs(this.targetY - this.y) > MOMENTUM_EPSILON;
    this._fire('scroll');

    if (Math.abs(this.velocity) > MOMENTUM_EPSILON) {
      this._fire('momentum', this.velocity);
    }

    this._rafId = requestAnimationFrame(this._loop);
  };

  // ---------- public API --------------------------------------------------

  scrollTo(y, { duration = 480 } = {}) {
    if (!this.enabled) {
      // Native fallback (reduced-motion path or before mount).
      window.scrollTo({ top: y, behavior: duration ? 'smooth' : 'instant' });
      return;
    }
    this._cancelTween();
    const to = clamp(y, 0, this.maxY);
    if (duration <= 0) {
      this.targetY = to;
      this.y = to;
      return;
    }
    this.tween = { from: this.y, to, startTime: performance.now(), duration };
  }

  stop() {
    this._cancelTween();
    this.targetY = this.y;
  }

  // Subscribe to engine events. Returns an unsubscribe function.
  on(event, fn) {
    const set = this.handlers[event];
    if (!set) return () => {};
    set.add(fn);
    return () => set.delete(fn);
  }

  off(event, fn) {
    this.handlers[event]?.delete(fn);
  }

  _cancelTween() {
    this.tween = null;
  }

  _fire(event, payload) {
    const set = this.handlers[event];
    if (!set || set.size === 0) return;
    // Snapshot so an unsubscribe during iteration doesn't break us.
    for (const fn of Array.from(set)) {
      try {
        fn(payload);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[smoothScroll]', event, 'listener threw:', err);
      }
    }
  }
}

function winHeight() {
  return window.innerHeight || document.documentElement.clientHeight || 800;
}

let instance = null;
export function getSmoothScroll() {
  if (!instance) instance = new SmoothScroll();
  return instance;
}

// Test helper — not used by the app.
export function _resetSmoothScrollForTests() {
  if (instance?.mounted) instance.destroy();
  instance = null;
}
