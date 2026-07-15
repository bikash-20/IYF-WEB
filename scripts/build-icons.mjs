// scripts/build-icons.mjs
//
// Generates every icon we need for the PWA + favicons from a single
// source: public/jagannath-eye.jpeg. We output:
//
//   public/favicon.ico             — 32x32, 16x16 multi-size
//   public/favicon-32.png          — 32x32 PNG (modern browsers)
//   public/favicon-16.png          — 16x16 PNG
//   public/apple-touch-icon.png    — 180x180 (iOS)
//   public/pwa-192.png             — 192x192 with "IYF SYLHET" wordmark
//   public/pwa-512.png             — 512x512 with wordmark
//   public/pwa-maskable-512.png    — 512x512 safe-zone maskable
//
// Run: `node scripts/build-icons.mjs`  (also runs as part of `prebuild`).

import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

const SOURCE = join(PUBLIC, 'jagannath-eye.jpeg');

// Saffron + cream palette — mirrors tailwind.config.js.
const SAFFRON = '#D98A2B';
const CREAM_50 = '#FBF7F0';
const TEMPLE_900 = '#15131A';

// SVG wordmark used for sizes ≥ 192. The image is the deity eye at
// ~62% scale on a cream card, with "IYF SYLHET" set in italic Fraunces
// serif below. This is rasterised via sharp's SVG input.
function wordmarkSVG(size) {
  const innerW = size;
  const eyeR = Math.round(size * 0.34);            // eye disc radius
  const eyeCY = Math.round(size * 0.40);           // eye vertical centre
  const wordSize = Math.round(size * 0.13);        // wordmark font size
  const wordY = Math.round(size * 0.86);           // wordmark baseline
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${innerW}" height="${innerW}" viewBox="0 0 ${innerW} ${innerW}">
  <!-- cream card -->
  <rect width="100%" height="100%" rx="${Math.round(size * 0.22)}" fill="${CREAM_50}"/>
  <!-- warm saffron ring -->
  <circle cx="${innerW / 2}" cy="${eyeCY}" r="${eyeR + Math.round(size * 0.025)}"
          fill="none" stroke="${SAFFRON}" stroke-width="${Math.max(2, Math.round(size * 0.012))}" opacity="0.55"/>
  <!-- the deity eye, scaled and centred -->
  <defs>
    <clipPath id="eyec">
      <circle cx="${innerW / 2}" cy="${eyeCY}" r="${eyeR}"/>
    </clipPath>
  </defs>
  <image href="file://${SOURCE}" x="${innerW / 2 - eyeR}" y="${eyeCY - eyeR}"
         width="${eyeR * 2}" height="${eyeR * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#eyec)"/>
  <!-- saffron underline above wordmark -->
  <line x1="${innerW * 0.30}" y1="${wordY - wordSize * 0.95}"
        x2="${innerW * 0.70}" y2="${wordY - wordSize * 0.95}"
        stroke="${SAFFRON}" stroke-width="${Math.max(2, Math.round(size * 0.006))}" stroke-linecap="round"/>
  <!-- wordmark — italic serif, deep temple tone -->
  <text x="50%" y="${wordY}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-style="italic" font-weight="500"
        font-size="${wordSize}" fill="${TEMPLE_900}"
        letter-spacing="0.04em">IYF SYLHET</text>
</svg>`.trim();
}

// For the maskable variant we keep the safe-zone (40% inner circle)
// and move the eye higher so the wordmark can sit inside the safe area.
function maskableSVG(size) {
  const innerW = size;
  const eyeR = Math.round(size * 0.28);
  const eyeCY = Math.round(size * 0.36);
  const wordSize = Math.round(size * 0.105);
  const wordY = Math.round(size * 0.72);
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${innerW}" height="${innerW}" viewBox="0 0 ${innerW} ${innerW}">
  <rect width="100%" height="100%" fill="${CREAM_50}"/>
  <circle cx="${innerW / 2}" cy="${eyeCY}" r="${eyeR + Math.round(size * 0.02)}"
          fill="none" stroke="${SAFFRON}" stroke-width="${Math.max(2, Math.round(size * 0.01))}" opacity="0.55"/>
  <defs>
    <clipPath id="eyec">
      <circle cx="${innerW / 2}" cy="${eyeCY}" r="${eyeR}"/>
    </clipPath>
  </defs>
  <image href="file://${SOURCE}" x="${innerW / 2 - eyeR}" y="${eyeCY - eyeR}"
         width="${eyeR * 2}" height="${eyeR * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#eyec)"/>
  <line x1="${innerW * 0.34}" y1="${wordY - wordSize * 0.95}"
        x2="${innerW * 0.66}" y2="${wordY - wordSize * 0.95}"
        stroke="${SAFFRON}" stroke-width="${Math.max(2, Math.round(size * 0.005))}" stroke-linecap="round"/>
  <text x="50%" y="${wordY}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-style="italic" font-weight="500"
        font-size="${wordSize}" fill="${TEMPLE_900}"
        letter-spacing="0.04em">IYF SYLHET</text>
</svg>`.trim();
}

// The smallest favicons only carry the eye (no wordmark — illegible at
// 16/32px). We compose the source JPEG into a saffron-bordered rounded
// square so it reads on either light or dark chrome.
async function makeSmallIcon(size) {
  const radius = Math.round(size * 0.22);
  const saffronRing = Math.max(1, Math.round(size * 0.04));
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 251, g: 247, b: 240, alpha: 1 },
    },
  })
    .composite([
      {
        input: await sharp(SOURCE)
          .resize(size - saffronRing * 4, size - saffronRing * 4, {
            fit: 'cover',
            position: 'centre',
          })
          .toBuffer(),
        blend: 'over',
      },
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
             <rect x="${saffronRing / 2}" y="${saffronRing / 2}"
                   width="${size - saffronRing}" height="${size - saffronRing}"
                   rx="${radius}" ry="${radius}"
                   fill="none" stroke="${SAFFRON}" stroke-width="${saffronRing}"/>
           </svg>`,
        ),
      },
    ])
    .png()
    .toBuffer();
}

// Apple touch icon — no wordmark (iOS adds its own corner radius and
// the icon is small enough that text would be illegible). The Jagannath
// eye sits dead-centre inside the icon's safe area.
async function makeAppleIcon() {
  const size = 180;
  const innerW = size;
  const eyeR = Math.round(size * 0.38);
  const eyeCY = Math.round(size * 0.50);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${innerW}" height="${innerW}" viewBox="0 0 ${innerW} ${innerW}">
  <rect width="100%" height="100%" fill="${CREAM_50}"/>
  <circle cx="${innerW / 2}" cy="${eyeCY}" r="${eyeR + Math.round(size * 0.03)}"
          fill="none" stroke="${SAFFRON}" stroke-width="${Math.max(2, Math.round(size * 0.012))}" opacity="0.55"/>
  <defs>
    <clipPath id="eyec">
      <circle cx="${innerW / 2}" cy="${eyeCY}" r="${eyeR}"/>
    </clipPath>
  </defs>
  <image href="file://${SOURCE}" x="${innerW / 2 - eyeR}" y="${eyeCY - eyeR}"
         width="${eyeR * 2}" height="${eyeR * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#eyec)"/>
</svg>`.trim();
  return sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

async function makePWA(size) {
  const svg = wordmarkSVG(size);
  return sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

async function makeMaskable() {
  const size = 512;
  const svg = maskableSVG(size);
  return sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

async function makeICO() {
  // 16 + 32 PNGs baked into a multi-size .ico (Windows + legacy tabs).
  const buf16 = await makeSmallIcon(16);
  const buf32 = await makeSmallIcon(32);
  const buf48 = await makeSmallIcon(48);

  // Build a tiny ICO header by hand. sharp can read PNG buffers and we
  // stitch them; this avoids pulling in `to-ico` as a dep.
  const pngs = [buf16, buf32, buf48];
  const widths = [16, 32, 48];
  const heights = [16, 32, 48];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);              // reserved
  header.writeUInt16LE(1, 2);              // type: 1 = .ico
  header.writeUInt16LE(pngs.length, 4);    // count

  const dirEntries = [];
  let offset = 6 + pngs.length * 16;
  for (let i = 0; i < pngs.length; i++) {
    const e = Buffer.alloc(16);
    e.writeUInt8(widths[i] >= 256 ? 0 : widths[i], 0);   // 0 = 256
    e.writeUInt8(heights[i] >= 256 ? 0 : heights[i], 1);
    e.writeUInt8(0, 2);                          // colour palette
    e.writeUInt8(0, 3);                          // reserved
    e.writeUInt16LE(1, 4);                       // planes
    e.writeUInt16LE(32, 6);                      // bpp
    e.writeUInt32LE(pngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    dirEntries.push(e);
  }

  return Buffer.concat([header, ...dirEntries, ...pngs]);
}

async function main() {
  if (!existsSync(SOURCE)) {
    console.error(`[icons] source not found: ${SOURCE}`);
    process.exit(1);
  }
  await mkdir(PUBLIC, { recursive: true });

  // 1. Small favicons (eye only)
  const fav16 = await makeSmallIcon(16);
  const fav32 = await makeSmallIcon(32);
  await writeFile(join(PUBLIC, 'favicon-16.png'), fav16);
  await writeFile(join(PUBLIC, 'favicon-32.png'), fav32);

  // 2. Multi-size .ico for legacy
  const ico = await makeICO();
  await writeFile(join(PUBLIC, 'favicon.ico'), ico);

  // 3. Apple touch icon
  const apple = await makeAppleIcon();
  await writeFile(join(PUBLIC, 'apple-touch-icon.png'), apple);

  // 4. PWA icons
  const pwa192 = await makePWA(192);
  const pwa512 = await makePWA(512);
  await writeFile(join(PUBLIC, 'pwa-192.png'), pwa192);
  await writeFile(join(PUBLIC, 'pwa-512.png'), pwa512);

  // 5. Maskable variant
  const maskable = await makeMaskable();
  await writeFile(join(PUBLIC, 'pwa-maskable-512.png'), maskable);

  // 6. SVG favicon (modern browsers, scales crisply). Eye is dead-centre
  //    inside a saffron ring; the wordmark sits below. Browsers that
  //    rasterise this (most do) will see the same composition as the
  //    small PNG favicons.
  const svgFav = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#FBF7F0"/>
  <circle cx="32" cy="32" r="20" fill="none" stroke="#D98A2B" stroke-width="2"/>
  <defs>
    <clipPath id="c"><circle cx="32" cy="32" r="18"/></clipPath>
  </defs>
  <image href="jagannath-eye.jpeg" x="14" y="14" width="36" height="36" clip-path="url(#c)" preserveAspectRatio="xMidYMid slice"/>
  <text x="50%" y="58" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="7" fill="#15131A" letter-spacing="0.5">IYF SYLHET</text>
</svg>`;
  await writeFile(join(PUBLIC, 'favicon.svg'), svgFav);

  console.log('[icons] wrote favicon.ico, favicon-16.png, favicon-32.png,');
  console.log('        apple-touch-icon.png, pwa-192.png, pwa-512.png,');
  console.log('        pwa-maskable-512.png, favicon.svg to', PUBLIC);
}

main().catch((err) => {
  console.error('[icons] failed:', err);
  process.exit(1);
});