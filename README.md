# ISKCON Youth Forum, Sylhet — Web Platform

Modern spiritual website for **ISKCON Youth Forum, Sylhet** — built with React + Vite + Tailwind CSS.

This is **Version 1**: a frontend-only implementation, organised as if more engineers will join later. The architecture is designed to grow into a full temple platform (CMS, donations, live streaming, role-based admin) without rewrites.

> The site references the temple **Sri Sri Radha Madhava Mandir, Jugaltila, Kajalshah, Sylhet** and the IYF Sylhet community.

---

## Stack

- **React 18** + **Vite 5** — fast dev server, small production bundle
- **Tailwind CSS 3** — design system via utility classes + CSS custom-property tokens
- **React Router 6** — public routes, lazy-loaded, with route-based code splitting
- **Framer Motion 11** — peaceful, restrained motion
- **Lucide Icons** — line-icon set
- **ESLint + Prettier** — code style and quality

> No backend in V1. Data is sourced from `src/data/*.js` files shaped like CMS responses, so the consuming components won't change when a real API arrives.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the production build
npm run lint
npm run format
```

Requires **Node 18+** (tested on Node 24).

---

## Project structure

```
src/
├─ main.jsx                 # React entry, BrowserRouter wrap
├─ App.jsx                  # Routes, lazy chunks, AnimatePresence
├─ styles/
│  ├─ index.css             # Tailwind layers + base + components
│  └─ tokens.css            # CSS custom properties (colors, motion)
├─ lib/
│  ├─ cn.js                 # class-name joiner
│  ├─ site.js               # Single source of truth for site config
│  └─ motion.js             # Shared Framer Motion variants
├─ data/                    # CMS-shaped fixtures
│  ├─ dailySchedule.js
│  ├─ events.js
│  ├─ courses.js
│  └─ gallery.js
├─ hooks/
│  ├─ useScrolled.js        # scroll-aware state for the navbar
│  └─ useMeta.js            # per-page title + description
├─ components/
│  ├─ layout/               # Navbar, Footer, Ticker, PageHero, Shell
│  ├─ ui/                   # Button, Card, Section, Badge, Reveal
│  └─ sections/             # Home-page building blocks
├─ features/                # Feature-based folders, ready to grow
│  ├─ home/  about/  schedule/  events/
│  ├─ gallery/  courses/  donate/  contact/  visit/
└─ pages/                   # One file per route
```

`features/` exists for future extraction: as a feature grows, its components, hooks, and data move there. `pages/` stay thin — they compose sections and pass data.

---

## Pages

| Route       | Page           | What's on it                                       |
| ----------- | -------------- | -------------------------------------------------- |
| `/`         | Home           | Hero, quick cards, About, Be SMART, schedule, media, visit |
| `/about`    | About          | Story, values, timeline                            |
| `/schedule` | Schedule       | Daily darshan & arati                               |
| `/events`   | Events         | Upcoming + annual festivals                         |
| `/gallery`  | Gallery        | Masonry of deity & festival photos                  |
| `/courses`  | Courses        | Be SMART — modules + meta                          |
| `/donate`   | Donate         | Causes + CTA to contact                            |
| `/contact`  | Contact        | Inquiry & volunteer forms + direct lines           |
| `/visit`    | Visit          | Map pin + address + contact                         |
| `*`         | 404            | Custom not-found                                    |

---

## Design system

All visual decisions live in two places, kept in sync:

- **`tailwind.config.js`** — Tailwind theme tokens (colors, font families, type scale, motion)
- **`src/styles/tokens.css`** — matching CSS custom properties for non-utility use (Framer Motion, inline gradients, SVGs)

### Color palette

| Role           | Token        | Hex      |
| -------------- | ------------ | -------- |
| Cream (bg)     | `cream-50`   | `#FBF7F0` |
| Cream muted    | `cream-100`  | `#F5EFE3` |
| Temple brown   | `temple-800` | `#2E2118` |
| Saffron        | `saffron-500`| `#D98A2B` |
| Peacock blue   | `peacock-500`| `#1B5E7A` |
| Maroon         | `maroon-700` | `#5C1620` |
| Ink (deep)     | `ink-900`    | `#15131A` |

Accent colors are used **sparingly** — saffron for CTAs, eyebrow text, and the timeline dots; peacock and maroon are reserved for thematic accents.

### Typography

- **Display**: `Fraunces` (variable serif) — headings, em-dashes
- **Body**: `Work Sans` — calm, neutral, readable
- **Mono**: `IBM Plex Mono` — eyebrows, time tags, labels

The type scale is custom and uses `clamp()` for fluid sizing (`text-display-xl` → `text-display-md`).

### Motion

All easing flows through a single curve: `cubic-bezier(0.22, 1, 0.36, 1)` (the "divine" curve). Animations are short, soft, and honor `prefers-reduced-motion`.

---

## Performance

- **Code splitting** — every page except Home is `React.lazy()` loaded
- **Manual chunks** — `react`, `motion`, `icons` are split out so the entry bundle stays small
- **`loading="lazy"`** on images
- **Reduced-motion** — animations are disabled when the user prefers it
- **Ticker pause** — the mantra ticker pauses when the tab is hidden

---

## Accessibility

- Skip-to-content link
- Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`, `<ol>`, `<ul>`)
- Visible `:focus-visible` ring using saffron accent
- ARIA where needed (mobile drawer `aria-expanded`, ticker `role="region"`, breadcrumb `aria-label`)
- Color contrast meets WCAG AA against the cream and ink backgrounds
- Honors `prefers-reduced-motion`

---

## Future-proofing (V2+)

Hooks are already in place for:

- **CMS** — replace `src/data/*.js` with API calls; the shape matches what a headless CMS would return
- **Auth + admin** — add a `routes/admin` group with role-guarded routes
- **Donations** — wire a Stripe / SSLCommerz flow to the Donate page CTA
- **Live streaming** — the YouTube embed card is already a feature, not a one-off
- **Search** — data is in plain JS objects, ready to be indexed
- **Dark mode** — tokens are CSS variables; a `data-theme` swap is a one-liner per token
- **i18n** — the site is in English; Bengali/Sanskrit support is a matter of adding a translation layer (typography fallback chain already includes Bengali)

See **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** for the full engineering plan.

---

## License

© ISKCON Youth Forum, Sylhet. All rights reserved.
