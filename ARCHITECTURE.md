# Architecture — V1

> This document is the engineering contract. It is intentionally written
> before code so the structure does not bend to whatever was easiest
> to type first.

---

## 1. Vision

A modern, peaceful, divine digital home for **ISKCON Youth Forum, Sylhet** — a frontend that feels like entering the mandir at sunrise, not a government brochure. Version 1 is frontend-only but organised as a real product: feature-based, component-driven, design-systemed, and ready to host a backend without rewrites.

## 2. Engineering goals

1. **Visual calm over visual noise.** The site should never feel busy.
2. **A design system, not a pile of utility classes.** Every value that can be a token *is* a token.
3. **Component boundaries that survive growth.** A feature should be able to move out of `src/components/sections/` into `src/features/<name>/` without consumers noticing.
4. **CMS-shaped data from day one.** Hard-coded JS objects are written in the shape an API would return.
5. **Accessible by default.** Skip link, focus rings, ARIA, reduced-motion — none of these are retrofits.
6. **Performance on a low-end Android.** Code splitting, manual chunks, lazy images, no client-side data fetching for static content.

## 3. Functional requirements (V1)

- Public, multi-page site for the mandir
- Home, About, Schedule, Events, Gallery, Courses, Donate, Contact, Visit, 404
- Inquiry form + volunteer form (no submission backend in V1)
- Responsive across phone / tablet / laptop
- Per-page meta tags (`title`, `description`)

## 4. Non-functional requirements

| Concern       | Target                                                     |
| ------------- | ---------------------------------------------------------- |
| LCP (mobile)  | < 2.5s on simulated 4G                                      |
| CLS           | < 0.05                                                     |
| Accessibility | WCAG 2.1 AA across all pages                                |
| Browser       | Last 2 versions of evergreen browsers + iOS Safari 16+     |
| Bundle        | Initial route < 200 KB gzipped; per-route < 80 KB          |
| Motion        | Disables itself when `prefers-reduced-motion: reduce`     |

## 5. Information architecture

```
/                  Home
/about             About the mandir & IYF
/schedule          Daily darshan & arati
/events            Upcoming + annual festivals
/gallery           Photo grid
/courses           Be SMART
/donate            Support the mandir
/contact           Inquiry + volunteer
/visit             Find us
*                  404
```

Future (V2+): `/admin/*`, `/auth/*`, `/live`, `/store`, `/blog`, `/search`, `/donate/checkout`.

## 6. Sitemap

```
IYF Sylhet
├── Home (Hero, Quick Cards, About, Be SMART, Schedule, Media, Visit)
├── About (Story, Values, Timeline)
├── Schedule (Timeline of daily arati)
├── Events (Upcoming, Annual festivals, Volunteer CTA)
├── Gallery (Masonry of deity/festival photos)
├── Courses (Be SMART modules + meta)
├── Donate (Causes + CTA)
├── Contact (Inquiry + Volunteer + Direct lines)
└── Visit (Map + Address + Contact)
```

## 7. Component hierarchy

```
App
└─ Layout
   ├─ Navbar
   ├─ Ticker
   ├─ <Outlet>
   │  └─ Page
   │     └─ Sections
   │        └─ Cards / Buttons / Badges
   └─ Footer
```

`components/ui/*` is the **primitive layer** — Button, Card, Section, Badge, RevealOnScroll, SectionHeading. They own styling and behaviour, never copy.

`components/sections/*` is the **composition layer** — Hero, ScheduleTimeline, BeSmartSection, etc. They compose primitives.

`components/layout/*` is the **shell layer** — Navbar, Footer, Ticker, PageHero, ScrollToTop, RouteFallback. They own global state interactions (scroll, route changes).

`pages/*` is the **route layer** — one file per route, thin, declarative.

`features/*` is reserved for V2 — when a feature grows beyond ~3 components or owns its own data fetching, it moves here with its `data/`, `hooks/`, and `components/` colocated.

## 8. Folder architecture — why each folder exists

| Folder                | Why it's here                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `src/main.jsx`        | The single entry. Wraps the app in `BrowserRouter` and `StrictMode`. Nothing else.             |
| `src/App.jsx`         | Route table + lazy boundaries + AnimatePresence.                                               |
| `src/styles/`         | `index.css` (Tailwind layers + base + components) and `tokens.css` (CSS custom properties).   |
| `src/lib/`            | Pure utilities with no React in them: `cn`, `site`, `motion` variants. Tree-shakable.          |
| `src/data/`           | CMS-shaped fixtures. **Shape is the contract** — when a real API arrives, only this folder changes. |
| `src/hooks/`          | Tiny custom hooks. Each one is named for what it does (`useScrolled`, `useMeta`).             |
| `src/components/ui/`  | The primitive library. Every component here is reusable, themable, and < 100 lines.            |
| `src/components/layout/` | The app shell pieces. The Navbar knows about the scroll; the Ticker knows about reduced-motion. |
| `src/components/sections/` | The home-page building blocks. Composed from `ui/`. They are not yet feature-locked.       |
| `src/features/`       | V2-ready. Each folder will own its own data, hooks, components, and tests.                     |
| `src/pages/`          | One file per route. Renders sections, sets meta, animates the page transition.                |

The intentional split is **`components/` for shared building blocks, `features/` for things that own their data and could be deleted without breaking the rest of the app**. V1 doesn't need features, but the folder exists so the boundary is honest from day one.

## 9. State architecture

**Recommendation: React state + React Context. No Zustand, no Redux.**

Why:

- The site is **read-mostly** in V1. There is no client-side business state to manage.
- The only cross-page state is "current route" — which React Router already owns.
- Theme, locale, and auth (V2) are perfect **Context** use-cases and are tiny in scope.
- Adding a state library now is a YAGNI trap. It would make sense the day we add a CMS-backed admin with complex form state, filters, and optimistic updates — that day is not today.

When (and only when) we add:

| Need                      | Solution             |
| ------------------------- | -------------------- |
| Theme (light/dark)        | `ThemeContext`       |
| Locale (en / bn / sa)     | `LocaleContext` + `react-intl` or `i18next` |
| Auth (admin)              | `AuthContext` + httpOnly cookie session     |
| Cart (temple store V2)    | **Zustand** — small, scoped, with persistence |
| CMS forms (admin)         | Local component state + React Hook Form     |

## 10. Routing architecture

- **Public-only** in V1. The `<Routes>` table is in `App.jsx`.
- **Lazy boundaries** at the page level: every page is `React.lazy()`.
- **AnimatePresence** wraps the routes with `mode="wait"` so transitions are sequential.
- **ScrollToTop** runs on every `pathname` change to reset the scroll offset.
- **Code splitting** is configured in `vite.config.js` via `manualChunks` so React/Router/motion/icons live in their own long-cacheable chunks.

Future protected routes (V2) will live in a `routes/admin.jsx` group with a `<RequireAuth>` wrapper that reads from `AuthContext` and redirects to `/auth/login`.

## 11. Design tokens

All visual decisions flow from these two files:

- `tailwind.config.js` — Tailwind theme (`colors`, `fontFamily`, `fontSize`, `letterSpacing`, `keyframes`, `animation`, `boxShadow`)
- `src/styles/tokens.css` — matching CSS custom properties for use in Framer Motion, inline styles, and SVGs

If a value isn't in both files, it isn't a token yet.

## 12. Typography system

| Role        | Family                                | Use                       |
| ----------- | ------------------------------------- | ------------------------- |
| Display     | `Fraunces` (variable, opsz 9–144)     | `h1`–`h3`, hero text      |
| Body        | `Work Sans`                           | Paragraphs, buttons       |
| Mono        | `IBM Plex Mono`                       | Eyebrows, time tags       |
| Bengali/Skt | `Tiro Bangla` → `Noto Serif Bengali`  | Reserved, fallback chain  |

Fluid sizing uses `clamp()` so headings scale smoothly from 320 px to 1440 px viewports.

## 13. Color system

Semantic and decorative tokens, in that order.

**Decorative** (raw hues):

- `cream-{50..300}` — surfaces
- `temple-{400..800}` — text, borders
- `saffron-{400..600}` — primary accent
- `peacock-{500..700}` — secondary accent (V2 use)
- `maroon-{600..800}` — tertiary accent (V2 use)
- `ink-{700..900}` — deep neutral, used for hero

**Semantic** (consumed by primitives, not directly in pages):

- `--bg`, `--bg-elevated`, `--bg-deep`, `--fg`, `--fg-muted`, `--fg-inverse`, `--border`, `--accent`, `--accent-soft`

Adding a new color requires both a Tailwind entry *and* a `--token` in `tokens.css`. This is enforced by code review, not tooling — small enough to police.

## 14. Spacing system

Tailwind's default scale, with two custom utilities:

- `.section-pad` — `py-20 md:py-28 lg:py-32`
- `.hr-soft` — `h-px w-12 bg-temple-400/60`

## 15. Animation system

- **Curve**: `cubic-bezier(0.22, 1, 0.36, 1)` (the "divine" curve). Defined in `lib/motion.js` and in the Tailwind `transitionTimingFunction.divine`.
- **Durations**: 450 ms base, 700 ms slow, 60 s for the ticker.
- **Variants** (`lib/motion.js`): `fadeUp`, `fadeIn`, `stagger`, `pageEnter`. Reused everywhere.
- **Restrained**: only one entrance per section, no parallax, no autoplay video.

## 16. Responsive strategy

- **Mobile-first** Tailwind breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1200`.
- The **Navbar** is desktop-horizontal, mobile-drawer.
- The **Ticker** is a single continuous strip on all sizes.
- The **Hero** swaps the headline break at `md`.
- The **Gallery** is a CSS `columns` masonry that re-flows naturally.
- The **Schedule timeline** stacks vertically on mobile, side-by-side on `md+`.

## 17. Accessibility checklist

- [x] Skip-to-content link
- [x] Semantic landmarks
- [x] `:focus-visible` ring
- [x] WCAG AA contrast on cream/ink surfaces
- [x] `prefers-reduced-motion: reduce` respected
- [x] Mobile drawer `aria-expanded`
- [x] Ticker `role="region"` with `aria-label`
- [x] Form labels associated with inputs
- [x] `alt` text on real images; `alt=""` on decorative
- [x] Breadcrumb `aria-label`

## 18. Future backend integration plan

When V2 ships a backend (Express or Spring Boot, TBD), the seams are:

| Concern         | Today                                 | V2                                                                 |
| --------------- | ------------------------------------- | ------------------------------------------------------------------ |
| Data            | `src/data/*.js`                       | Replace each module with an API client; components don't change    |
| Forms           | `onSubmit={(e) => e.preventDefault()}` | POST to `/api/contact` and `/api/volunteer`                          |
| Donations       | CTA → `/contact`                      | Stripe / SSLCommerz redirect, then webhook → `/api/donations`       |
| Auth            | none                                  | `/api/auth/login` → httpOnly cookie → `AuthContext`                |
| Live streaming  | YouTube link                          | Embed `<iframe>` with HLS source; reuse the existing card         |
| CMS             | `data/*.js`                           | Headless CMS (Sanity / Strapi) — same shape, fetched at build time |
| Search          | none                                  | Algolia or a simple `/api/search` with a client-side index         |
| i18n            | English only                          | `i18next` + Bengali/Sanskrit dictionaries; font fallback in place  |
| Dark mode       | none                                  | `data-theme="dark"` swap; tokens are already CSS variables         |

## 19. Technical debt to avoid

1. **Inline styles** for anything that isn't a one-off gradient. Use Tailwind utilities or CSS variables.
2. **Hard-coded colors** in components. Always reach for a token.
3. **Data inside components.** Keep `data/*.js` separate; if a component reaches into a sibling for data, refactor.
4. **Components over ~200 lines.** Split. Composition > monoliths.
5. **Untyped props.** Even without TypeScript, document prop shapes with JSDoc.
6. **Side effects in render.** Use `useEffect` for the DOM, not the body of the component.
7. **Forced animations.** Always honor `prefers-reduced-motion`.
8. **Catch-all `useEffect`.** Name them, scope them, return cleanup.
9. **Mixing concerns.** `pages/*` compose, `sections/*` build, `ui/*` primitive, `layout/*` shell, `features/*` own.
10. **Premature abstractions.** Don't make a `Heading` component if a `<h2 className="...">` is enough. Add abstraction when the third use case appears.

## 20. Coding rules

- **SOLID** where it doesn't fight React idioms.
- **DRY** — third time's the charm, not the second.
- **KISS** — a `<div>` with two classes is fine.
- **Small components** — target < 200 lines.
- **Custom hooks** for every reused effect.
- **Strict-TypeScript-ready** — JSDoc `@param` on props, no implicit `any` in shared APIs.
- **ESLint clean**, **Prettier-formatted**.

---

*Last updated: V1.*
