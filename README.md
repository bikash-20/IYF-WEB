# ISKCON Youth Forum, Sylhet — Web Platform

A modern, peaceful, divine digital home for **ISKCON Youth Forum, Sylhet** — the youth wing of **Sri Sri Radha Madhava Mandir**, Jugaltila, Kajalshah, Sylhet. Built as a frontend-first Vite + React app that installs as a PWA and is wired to deploy on every push to `main`.

> **Live site:** [https://iyf-web-six.vercel.app/](https://iyf-web-six.vercel.app/)
> **Stack:** React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · Framer Motion 11 · Lucide Icons

---

## What this is, in one paragraph

Version 1 is a static React app that reads everything from `src/data/*.js` files shaped exactly like a future CMS would respond. There is no backend yet — but the consuming components don't know that, so when the mandir is ready to plug in a CMS, donations, live streaming, or admin auth, the seams are already cut. The site is a PWA: visitors can install it to their phone, the daily darshan schedule updates live in Bangladesh time, and a service worker keeps the doors open even when the network doesn't.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the production build
npm run icons    # regenerate PWA icons from /public/favicon.svg
npm run lint
npm run format
```

Requires **Node 18+** (tested on Node 24).

---

## What's on the site

| Route | Page | What it does |
|---|---|---|
| `/` | **Home** | Living hero, today's darshan, thought/verse of the day, upcoming festival countdown, quick cards, Be SMART, media, visit |
| `/about` | **About** | The mandir's story, four pillars (Sādhana · Sanga · Seva · Śāstra), timeline from Prabhupada to IYF Sylhet |
| `/schedule` | **Schedule** | Daily darshan & arati in Bangladesh time, weekly rotation |
| `/events` | **Events** | Featured festival countdown + annual calendar (Janmashtami, Gaura Purnima, Ratha Yatra, …) |
| `/gallery` | **Gallery** | Editorial masonry of deity & festival photographs |
| `/courses` | **Courses** | Be SMART — a 9-module foundational course for young adults 17+ |
| `/donate` | **Donate** | Seva causes with CTA to contact the temple directly |
| `/contact` | **Contact** | Inquiry & volunteer forms, phone, WhatsApp, Messenger, email |
| `/visit` | **Visit** | Address, map pin, temple hours, all contact lines |
| `*` | **404** | Custom not-found, with a way back to the home page |

Everything is fully responsive (phone / tablet / laptop), lazy-loaded per route, and respects `prefers-reduced-motion`.

---

## Project structure

```
src/
├─ main.jsx                  # React entry, BrowserRouter + service-worker register
├─ App.jsx                   # Routes, lazy chunks, AnimatePresence
├─ styles/
│  ├─ index.css              # Tailwind layers + base + components (.glass-*, .cta-*)
│  └─ tokens.css             # CSS custom properties (colors, motion, glass)
├─ lib/
│  ├─ cn.js                  # class-name joiner
│  ├─ site.js                # Single source of truth (address, phone, social, mantra)
│  └─ motion.js              # Shared Framer Motion variants
├─ data/                     # CMS-shaped fixtures
│  ├─ dailySchedule.js
│  ├─ events.js
│  ├─ courses.js
│  ├─ gallery.js
│  └─ featuredFestival.js
├─ content/                  # Static editorial content
│  ├─ thoughtOfTheDay.js
│  └─ verseOfTheDay.js
├─ hooks/
│  ├─ useHeroTime.js         # time-of-day flavor for the hero
│  ├─ useNow.js              # ticking clock (1-min interval) for live schedule
│  ├─ useMeta.js             # per-page title + description
│  └─ useScrollReveal.js     # rAF-throttled viewport reveal helper
├─ components/
│  ├─ layout/                # Navbar, Footer, PageHero, Layout, ScrollToTop, RouteFallback
│  ├─ pwa/                   # InstallBanner (draggable A2HS prompt)
│  ├─ sections/              # Home-page building blocks
│  └─ ui/                    # Button, Card, Section, Reveal, Atmosphere, Embers, Mantra, …
├─ features/                 # Per-page feature folders (ready to grow)
│  ├─ home/  about/  schedule/  events/
│  └─ gallery/  courses/  donate/  contact/  visit/
└─ pages/                    # One file per route — thin, just composition
```

`features/` exists for future extraction: as a feature grows, its components, hooks, and data move there. `pages/` stay thin — they compose sections and pass data in.

---

## Design system

All visual decisions live in two places, kept in sync:

- **`tailwind.config.js`** — Tailwind theme tokens (colors, font families, type scale, motion)
- **`src/styles/tokens.css`** — matching CSS custom properties for non-utility use (Framer Motion, inline gradients, SVGs, glass surfaces)

### Color palette

| Role | Token | Hex |
|---|---|---|
| Cream (page bg) | `cream-50` | `#FBF7F0` |
| Cream muted | `cream-100` | `#F5EFE3` |
| Temple brown (text) | `temple-800` | `#2E2118` |
| Saffron (CTA / accent) | `saffron-500` | `#D98A2B` |
| Peacock blue | `peacock-500` | `#1B5E7A` |
| Maroon | `maroon-700` | `#5C1620` |
| Ink (deep / navbar over hero) | `ink-900` | `#15131A` |

Accent colors are used **sparingly** — saffron for CTAs, eyebrow text, and timeline dots; peacock and maroon are reserved for thematic accents.

### Typography

- **Display**: `Fraunces` (variable serif) — headings, em-dashes, the "Sylhet" italic
- **Body**: `Work Sans` — calm, neutral, readable at small sizes
- **Mono**: `IBM Plex Mono` — eyebrows, time tags, labels

The type scale is custom and uses `clamp()` for fluid sizing (`text-display-xl` → `text-display-md`).

### Motion

All easing flows through a single curve: `cubic-bezier(0.22, 1, 0.36, 1)` — the "divine" curve. Animations are short, soft, and the entire app short-circuits them when `prefers-reduced-motion: reduce` is set.

---

## PWA

The site is installable on Android, iOS, and desktop.

- **`public/manifest.webmanifest`** — name, theme color, maskable icons, three shortcuts (Today's Darshan, Visit, Be SMART)
- **`public/sw.js`** — versioned caches (`iyf-v0.5.0-shell`, `iyf-v0.5.0-assets`); network-first for HTML navigations with an offline fallback to the cached shell, cache-first for fingerprinted `/assets/*`
- **`src/components/pwa/InstallBanner.jsx`** — draggable, dismissible A2HS prompt that fires only on supported browsers, only after the user has interacted with the page
- **`scripts/build-icons.mjs`** — regenerates `pwa-192.png`, `pwa-512.png`, `pwa-maskable-512.png`, `apple-touch-icon.png`, and the favicons from `public/favicon.svg` via `sharp`

The service worker version is bumped on every deploy so old caches evict cleanly.

---

## Performance

- **Code splitting** — every page except Home is `React.lazy()` loaded
- **Manual chunks** — `react`, `motion`, `icons` are split out so the entry bundle stays small
- **`loading="lazy"`** on images below the fold
- **Reduced motion** — animations disable themselves when the user prefers it
- **Service worker** — instant repeat visits, offline shell

Accessibility targets:

- Skip-to-content link on every page
- Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`, `<ol>`, `<ul>`)
- Visible `:focus-visible` ring using the saffron accent
- ARIA where needed (mobile drawer `aria-expanded`, mantra inscription `aria-label`, breadcrumb `aria-label`)
- Color contrast meets WCAG AA against the cream and ink backgrounds

---

## Deployment

Vercel renders automatically on every push to `main`.

- **`vercel.json`** declares the Vite framework preset, `npm run build` → `dist`, an SPA rewrite so every route serves `index.html` (React Router handles the route client-side), and cache headers for `sw.js` / `manifest.webmanifest` (`max-age=0, must-revalidate`) and `/assets/*` (`max-age=31536000, immutable`)
- **`.vercel/` is git-ignored** so the CLI's project-link metadata stays local

Preview deploys are created automatically for every pull request; production deploys are created for every merge to `main`.

---

## Future-proofing (V2+)

Hooks are already in place for:

- **CMS** — replace `src/data/*.js` with API calls; the shape already matches what a headless CMS would return
- **Auth + admin** — add a `routes/admin` group with role-guarded routes
- **Donations** — wire a Stripe / SSLCommerz flow to the Donate page CTA
- **Live streaming** — the YouTube embed card is already a feature, not a one-off
- **Search** — data is in plain JS objects, ready to be indexed
- **Dark mode** — tokens are CSS variables; a `data-theme` swap is a one-liner per token
- **i18n** — the site is in English; Bengali/Sanskrit support is a matter of adding a translation layer (the typography fallback chain already includes Bengali)

See **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** for the full engineering plan and **[`docs/PHOTO_BRIEF.md`](./docs/PHOTO_BRIEF.md)** for the photography direction.

---

## Credits

Designed and developed by [Bikash Talukder](https://github.com/bikash-20).
Built with reverence for the devotees of Sri Sri Radha Madhava Mandir.

© ISKCON Youth Forum, Sylhet. All rights reserved.