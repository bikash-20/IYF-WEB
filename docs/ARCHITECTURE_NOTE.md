# Architecture note — long-term folder restructure

> Not implemented in v0.3 — captured here so the decision lives with
> the code. v0.5 is the natural moment to adopt this once the
> content/feature surface has grown.

## The argument

Design, content, and features evolve at different rates. Right now
they live side by side. Separating them makes seasonal updates
(festival content, a new visual theme, a new section) cheap without
disturbing core UI code.

## Proposed structure

```
src/
  design-system/
    atoms/        # Buttons, Tag, Eyebrow, Pill, Icons
    molecules/    # FloatingCard, SacredQuote, EditorialImage
    organisms/    # Section, SectionHeader, Navbar, Footer
  theme/
    tokens/       # colors.css, typography.css, shadow.css
    atmosphere/   # the 6 atmospheric palettes
    motion/       # variants, easings, durations
  content/
    festivals/    # featuredFestival.js, festival index
    quotes/       # thoughtOfTheDay.js, verseOfTheDay.js
    temple/       # site.js, dailySchedule.js, address.js
    photography/  # photo metadata + slot mapping
  features/
    home/
    about/
    schedule/
    events/
    gallery/
    courses/
    visit/
  lib/            # cross-cutting utils (cn, motion, seo)
  pages/          # route shells
```

## Why defer

- We have ~ 10 features. The threshold where the cost of moving
  exceeds the cost of staying is around 20 features or 12 months.
- v0.3-v0.4 is about polish + photography. v0.5 is the right moment
  to migrate because the audit cycles (a11y / perf / SEO) will
  naturally want to live alongside the relevant code.
- The current structure is intentionally CMS-shaped (data files
  separate from UI), which is the most important property. The
  atoms/molecules/organisms split is cosmetic until the design
  system has 30+ components.

## Migration order when we do it

1. Move `src/styles/tokens.css` -> `src/theme/tokens/colors.css`,
   split typography + shadows out.
2. Move `src/components/ui/Atmosphere.jsx`,
   `RadialLight.jsx` -> `src/theme/atmosphere/`.
3. Move data files in `src/data/` -> `src/content/`, regrouped.
4. Move design-system primitives (atoms/molecules/organisms) under
   `src/design-system/`.
5. Move section files under `src/features/<page>/`.
6. Update imports via jscodeshift codemod (or by hand — 4 pages only).