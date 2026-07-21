/**
 * Convierte hero_propuesta → WebP (nativo + 1920px HD)
 * Uso: node tools/convert-hero-image.mjs [ruta-origen-opcional]
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DEST = 'assets/proyecto-pavimentacion-comercial-en-ejecucion.webp';
const DEST_HD = 'assets/proyecto-pavimentacion-comercial-en-ejecucion-1920.webp';
const HD_WIDTH = 1920;
const CANDIDATES = [
  process.argv[2],
  'assets/hero_propuesta.jpeg',
  'assets/hero_propuesta.png',
  'hero_propuesta.jpeg',
  '/mnt/data/hero_propuesta.jpeg',
].filter(Boolean);

const src = CANDIDATES.find((p) => fs.existsSync(p));
if (!src) {
  console.error('No se encontró la imagen de origen.');
  process.exit(1);
}

const inputSize = fs.statSync(src).size;
const inputMeta = await sharp(src).metadata();

await sharp(src)
  .webp({ quality: 92, effort: 6, smartSubsample: false })
  .toFile(DEST);

await sharp(src)
  .resize(HD_WIDTH, null, { kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
  .sharpen({ sigma: 0.6, m1: 0.5, m2: 0.25 })
  .webp({ quality: 90, effort: 6, smartSubsample: false })
  .toFile(DEST_HD);

const nativeMeta = await sharp(DEST).metadata();
const hdMeta = await sharp(DEST_HD).metadata();

console.log(JSON.stringify({
  source: src,
  input: { width: inputMeta.width, height: inputMeta.height, bytes: inputSize },
  native: { path: DEST, width: nativeMeta.width, height: nativeMeta.height, bytes: fs.statSync(DEST).size },
  hd: { path: DEST_HD, width: hdMeta.width, height: hdMeta.height, bytes: fs.statSync(DEST_HD).size },
}, null, 2));
