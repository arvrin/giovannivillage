// One-shot OG image generator. Composites:
//   • hero-1.webp resized to 1200×630
//   • dark gradient overlay (top 35% subtle, bottom 65% deeper) so the
//     centred logo + tagline have weight without flattening the photo
//   • Giovanni logo centred in the upper-middle band
//   • tagline + brand line in serif italic + small eyebrow caps
//
// Run with:  node scripts/generate-og.mjs
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const W = 1200;
const H = 630;
const HERO = path.join(root, 'public/images/hero/hero-1.webp');
const LOGO = path.join(root, 'public/images/logo/gvr-final-logo.webp');
const OUT = path.join(root, 'public/images/og/og-default.jpg');

// Decode the logo to PNG so we can size and composite it precisely.
const logoBuf = await sharp(LOGO)
  .resize({ height: 140, fit: 'inside' })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoBuf).metadata();
const logoWidth = logoMeta.width ?? 0;
const logoHeight = logoMeta.height ?? 140;

// Overlay layer — full-bleed dark gradient with a vignette-style fall-off
// from top to bottom. SVG so we can express the gradient cleanly.
const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="rgb(8,18,22)" stop-opacity="0.55"/>
      <stop offset="45%"  stop-color="rgb(8,18,22)" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="rgb(8,18,22)" stop-opacity="0.78"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#dark)"/>
</svg>`;

// Text block — eyebrow on top, tagline below. Centred under the logo.
// We sit it 80px below the logo's lower edge.
const textTop = Math.floor(H * 0.32 + logoHeight + 80);

const textSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .eyebrow {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 20px;
      letter-spacing: 6px;
      text-transform: uppercase;
      fill: #ffffff;
      opacity: 0.78;
    }
    .tagline {
      font-family: Georgia, 'Times New Roman', serif;
      font-style: italic;
      font-weight: 400;
      font-size: 54px;
      fill: #ffffff;
    }
    .brand {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      letter-spacing: 4px;
      text-transform: uppercase;
      fill: #ffffff;
      opacity: 0.55;
    }
  </style>
  <text x="${W / 2}" y="${textTop}" text-anchor="middle" class="eyebrow">
    Luxury Wildlife Resort · Bhopal
  </text>
  <text x="${W / 2}" y="${textTop + 78}" text-anchor="middle" class="tagline">
    A place to remember what slow feels like.
  </text>
  <text x="${W / 2}" y="${H - 50}" text-anchor="middle" class="brand">
    giovannivillage.com
  </text>
</svg>`;

const logoTop = Math.floor(H * 0.22);
const logoLeft = Math.floor((W - logoWidth) / 2);

await sharp(HERO)
  .resize(W, H, { fit: 'cover', position: 'center' })
  .composite([
    { input: Buffer.from(overlaySvg), top: 0, left: 0 },
    { input: logoBuf, top: logoTop, left: logoLeft },
    { input: Buffer.from(textSvg), top: 0, left: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

console.log(`✓ Wrote ${OUT}`);
