# Photography brief — IYF · Sylhet

> Goal: a single visual language across the whole site. Same lighting
> temperature, same contrast, same mood. Premium websites are 50 %
> engineering and 50 % photography. This file is what makes the second
> 50 % happen.

## Style direction

- **Lighting**: warm golden-hour or warm interior lamplight. No
  fluorescents, no cold flashes, no mixed-temperature frames.
- **Contrast**: low-to-medium. Shadows are warm, never pure black.
  Highlights are cream, never pure white.
- **Mood**: contemplative, devotional, slow. Not a stage show.
- **Composition**: editorial — leave breathing room. Subjects offset
  from centre. Negative space matters as much as the subject.
- **Subjects**: people, deities, hands, fire, water, feet on stone.
  No faces staring at camera. No group-pose shots.
- **Crop**: shoot 3:2 with the intention of being cropped to 4:5 and
  16:9. Leave margin on all sides.
- **Format**: shoot RAW + export as JPEG at 4 000 px long edge.
  Filename: `iyf-{slot}-{seq}.jpg`.

## What we need (priority order)

> Drop into `public/` and tell me the filenames — I will rewire the
> `EditorialGallery` slots and replace the gradients automatically.

### Tier 1 — replace the placeholders (1 weekend shoot)

| Slot | Subject | Crop | Notes |
|---|---|---|---|
| `gallery-1.jpg` | Deities in lamplight, full-frame wide | 3:2 | Warm. Smoke, flame, no flash. |
| `gallery-2.jpg` | Interior daylight — archway or pillar | 3:2 | Soft light, no people. |
| `gallery-3.jpg` | Mangal Arati — single diya, hand offering | 4:5 | At 4:30 AM if possible. Warm. |
| `gallery-4.jpg` | Bhagavatam class — close on book + hand turning page | 4:5 | Soft afternoon light. |
| `gallery-5.jpg` | Prasadam — brass thali with rice + sabzi | 1:1 | Overhead, even warm light. |
| `gallery-6.jpg` | Kirtan — close on karatalas (cymbals) in motion blur | 4:5 | Shutter ~ 1/30 s. |
| `gallery-7.jpg` | Tulsi plant, sun on the walkway | 4:5 | 7 AM. |
| `gallery-8.jpg` | Sandhya Arati — wide angle, lamps in foreground | 16:9 | Flame is the subject. |

### Tier 2 — replaces the two hero photos we already have

| Slot | Subject | Crop | Notes |
|---|---|---|---|
| `hero.jpg` | Deities, full frame, eye-level | 3:2 | For the home hero. **Lower-than-eye-line** so the deities feel like they are looking at you. |
| `quote-bg.jpg` | Deities, dark and intimate | 4:5 | For SacredQuote background. Dimmer than hero.jpg. |

### Tier 3 — page-specific assets

| Page | Subject | Crop |
|---|---|---|
| About | Devotees reading scripture — over-the-shoulder | 4:5 |
| Schedule | Time-of-day shots: dawn light, 8 AM room, noon prasadam, 6 PM lamps | 1:1 each |
| Visit | Gate sign → path → courtyard → temple room | 16:9 series |
| Events | Festival-wide: crowd mid-kirtan | 16:9 |
| Courses | Be SMART — close on notes and a face in profile | 1:1 |

## Don'ts

- No logo overlays.
- No Instagram-style presets. Hand-edit the curve, lower the
  saturation by ~ 15 %, then add the IYF LUT (we'll write one).
- No "nice" portraits. The site should never feel like stock.
- No more than one deity per frame where possible.

## Filename convention

```
public/
  hero.jpg
  quote-bg.jpg
  gallery-1.jpg ... gallery-8.jpg
  about-1.jpg
  schedule-dawn.jpg
  schedule-morning.jpg
  schedule-noon.jpg
  schedule-evening.jpg
  visit-1.jpg visit-2.jpg visit-3.jpg visit-4.jpg
```

After dropping the files in `public/`, the components will pick
them up automatically once you tell me which slot they correspond
to. If you want to keep the current filenames (`little-1.jpg`,
`little-2.jpg`) and add new ones, that works too — I will rewrite
the gallery map.
