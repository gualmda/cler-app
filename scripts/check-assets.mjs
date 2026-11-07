import { stat } from 'node:fs/promises';
import { join } from 'node:path';
const files = ["hero-cler.webp", "historia-cler.webp", "tela-1-cler.webp", "tela-2-cler.webp", "tela-3-cler.webp", "tela-4-cler.webp", "auto-cuidado.webp", "familia-cuidado.webp", "cuidado-profissional.webp", "brand-cler.webp"];
const missing = [];
const required = files.flatMap((f) => [f, f.replace(/\.webp$/, "-480.webp"), f.replace(/\.webp$/, "-960.webp")]);
for (const file of required) {
  try { if ((await stat(join(process.cwd(), 'public', 'assets', file))).size < 1024) missing.push(file); }
  catch { missing.push(file); }
}
if (missing.length) {
  console.error('Missing original images:', missing.join(', '));
  console.error('Run `npm run assets:sync` on an Internet-connected machine, then commit the generated public/assets/*.webp files.');
  process.exitCode = 1;
}
