// Named parallax magnitudes. Use these instead of raw floats so the
// vocabulary stays consistent across sections — same idea as the
// `easeDivine` / `heroTiming` / `galleryTiming` tokens in motion.js.
//
// `speed` is the drift coefficient fed into <Parallax>. Internally
// the wrapper multiplies it by ±80 px (Y) or ±40 px (X), so a value
// of 0.2 with axis='y' = a layer drifting up to ±16 px as it crosses
// the viewport.

export const parallaxPresets = {
  // A barely-there drift for foreground content that should move
  // with the page but not call attention to itself. Used for hero
  // photos, headings, portraits.
  subtle: 0.08,
  // The default for decorative layers sitting behind content. Reads
  // as "the room has depth" without being theatrical.
  default: 0.15,
  // For very-back atmospheric layers that should clearly lag the
  // foreground. Use sparingly — at this magnitude the drift is felt
  // before it's seen.
  strong: 0.25,
  // Foreground / "approaching" direction — the layer rises into view
  // as the user scrolls down. Pairs nicely with a `default`-speed
  // background in the same scene.
  reverse: -0.12,
};
