#!/usr/bin/env node
/** Fetch the original CLER-owned imagery once, optimize to local WebP.
 * Images must be committed to public/assets before production deployment.
 * No third-party image requests happen from the visitor's browser.
 */
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
const manifest = [
  { filename: "hero-image.png", url: "https://framerusercontent.com/images/wI77eRcUMB8iR9aevS9XFsbU28.png?height=1750&width=2532", width: 1400 },
  { filename: "historia-cler.webp", url: "https://framerusercontent.com/images/7DasQCpiJmn46tCAf9RVGUac8c.jpeg?height=853&width=1280", width: 1400 },
  { filename: "tela-1-cler.webp", url: "https://framerusercontent.com/images/b04S0iPIKkACToSiZutrogWv6U.png?height=966&width=493", width: 900 },
  { filename: "tela-2-cler.webp", url: "https://framerusercontent.com/images/EnIJXMMjhBZrS30nOt61oe9MRo.png?height=966&width=493", width: 900 },
  { filename: "tela-3-cler.webp", url: "https://framerusercontent.com/images/DlFxdlIV6WdcUDgcQMEQND0Fq5I.png?height=966&width=493", width: 900 },
  { filename: "tela-4-cler.webp", url: "https://framerusercontent.com/images/vrkgeppEMKHXzy2TjRYfaOClo.png?height=966&width=493", width: 900 },
  { filename: "auto-cuidado.webp", url: "https://framerusercontent.com/images/QKNdmnpruOoCYV0dUl1h68Oi7A.png?height=1024&width=1536", width: 1400 },
  { filename: "familia-cuidado.webp", url: "https://framerusercontent.com/images/Rr4xTf8Uen8XvDbkjAIYoZHZD0.png?height=1024&width=1536", width: 1400 },
  { filename: "cuidado-profissional.webp", url: "https://images.unsplash.com/photo-1764006145420-df3006edf060?auto=format&fit=crop&fm=jpg&q=80&w=1600", width: 1400 },
  { filename: "brand-cler.webp", url: "https://framerusercontent.com/images/0idPQ1yveGHqGoYDtDfWza5Ho.png?height=162&scale-down-to=512&width=730", width: 1400 },
];
const dir = join(process.cwd(), 'public', 'assets');
await mkdir(dir, { recursive: true });
let failed = 0;
for (const image of manifest) {
  const dest = join(dir, image.filename);
  try { if ((await stat(dest)).size > 1024) { console.log('OK:', image.filename); continue; } } catch {}
  try {
    const response = await fetch(image.url, { signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'Mozilla/5.0 CLER asset sync' }});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const source = Buffer.from(await response.arrayBuffer());
    const data = await sharp(source).rotate().resize({ width: image.width, withoutEnlargement: true })
      .webp({ quality: image.filename.startsWith('tela-') ? 88 : 82, effort: 5 }).toBuffer();
    await writeFile(dest, data);
    for (const w of [480, 960]) {
      const variant = image.filename.replace(/\.webp$/, `-${w}.webp`);
      const resized = await sharp(source).rotate().resize({ width: w, withoutEnlargement: true })
        .webp({ quality: image.filename.startsWith('tela-') ? 85 : 78, effort: 5 }).toBuffer();
      await writeFile(join(dir, variant), resized);
    }
    console.log('Saved:', image.filename, data.length, 'bytes');
  } catch (e) { console.error('NOT DOWNLOADED:', image.filename, String(e)); failed++; }
}
if (failed) {
  console.error(`Could not fetch ${failed} asset(s). Check that the original source is accessible or provide the originals in public/assets.`);
  process.exitCode = 1;
}
