/**
 * Convierte a WebP todas las imágenes PNG/JPG de las carpetas indicadas.
 * Uso:  node tools/convert-webp.mjs [carpeta1] [carpeta2] ...
 * Por defecto procesa assets/proyectos y assets/pavimentos.
 *
 * - Redimensiona a un ancho máximo (MAX_WIDTH) manteniendo proporción.
 * - Calidad WebP configurable (QUALITY).
 * - Borra el archivo original tras convertirlo correctamente.
 */
import sharp from 'sharp';
import { readdir, unlink, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';

const MAX_WIDTH = 1400;
const QUALITY = 80;
const EXTS = ['.png', '.jpg', '.jpeg'];

const dirs = process.argv.slice(2);
if (dirs.length === 0) dirs.push('assets/proyectos', 'assets/pavimentos');

async function convertDir(dir) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    console.log(`(saltada, no existe) ${dir}`);
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    const info = await stat(full);
    if (info.isDirectory()) {
      await convertDir(full);
      continue;
    }
    const ext = extname(name).toLowerCase();
    if (!EXTS.includes(ext)) continue;

    const out = join(dirname(full), name.slice(0, -ext.length) + '.webp');
    await sharp(full)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);

    const before = (info.size / 1024).toFixed(0);
    const after = ((await stat(out)).size / 1024).toFixed(0);
    console.log(`${name}  ${before}KB -> ${after}KB`);
    await unlink(full);
  }
}

for (const d of dirs) await convertDir(d);
console.log('Conversión completada.');
