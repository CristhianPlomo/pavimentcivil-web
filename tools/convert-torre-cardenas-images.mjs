/**
 * Convierte imágenes del Centro Comercial Torrecárdenas → WebP optimizado
 * Uso: node tools/convert-torre-cardenas-images.mjs
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC_DIR =
  'C:/Users/crist/.cursor/projects/c-Users-crist-Desktop-JaraSoft-Websites-pavimentcivil/assets';
const DEST_DIR = 'assets/proyectos/centro-comercial-torre-cardenas';

const MAPPING = [
  {
    src: 'c__Users_crist_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_PortadaCentroCardenas-12c7df22-1520-48d0-b8c3-a57ee92b148b.png',
    srcDir: SRC_DIR,
    dest: 'centro-comercial-torre-cardenas-resultado-final.webp',
    maxWidth: 1920,
    quality: 82,
    hero: true,
  },
  {
    src: 'c__Users_crist_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_centroComercial_8-30c9ebef-fd0e-4654-b656-6b2078ee227b.png',
    dest: 'centro-comercial-torre-cardenas-pavimentacion-exterior.webp',
    maxWidth: 1920,
    quality: 82,
    hero: true,
  },
  {
    src: 'c__Users_crist_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_centroComercial_7-3de59a5c-47f7-4da2-83d8-3474080f98f1.png',
    dest: 'centro-comercial-torre-cardenas-acceso-principal.webp',
    maxWidth: 1400,
    quality: 80,
  },
  {
    src: 'c__Users_crist_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_centroComercial_5-246d2f35-2e05-4273-8169-4f9cfba9c0ef.png',
    dest: 'centro-comercial-torre-cardenas-zona-peatonal.webp',
    maxWidth: 1400,
    quality: 80,
  },
  {
    src: 'c__Users_crist_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_centroComercial_4-e1ccb88e-c9af-40b2-9edb-0ac2f91f10b4.png',
    dest: 'centro-comercial-torre-cardenas-vista-general-obra.webp',
    maxWidth: 1600,
    quality: 80,
  },
  {
    src: 'c__Users_crist_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_centroComercial_3-dfdd608a-7add-4170-bba4-f9231414518c.png',
    dest: 'centro-comercial-torre-cardenas-bordillo-curvo.webp',
    maxWidth: 1200,
    quality: 80,
  },
  {
    src: 'c__Users_crist_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_centroComercial_2-30d6844b-5a92-4542-9cb7-5645a4880201.png',
    dest: 'centro-comercial-torre-cardenas-ejecucion-adoquines.webp',
    maxWidth: 1400,
    quality: 80,
  },
  {
    src: 'c__Users_crist_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_centroComercial_1-cd3cc487-052c-45c8-af4c-9e77f9b48268.png',
    dest: 'centro-comercial-torre-cardenas-pavimento-circular.webp',
    maxWidth: 1400,
    quality: 80,
  },
];

fs.mkdirSync(DEST_DIR, { recursive: true });

const report = [];

for (const item of MAPPING) {
  const baseDir = item.srcDir || SRC_DIR;
  const srcPath = path.join(baseDir, item.src);
  const destPath = path.join(DEST_DIR, item.dest);
  if (!fs.existsSync(srcPath)) {
    console.error(`Missing: ${srcPath}`);
    process.exit(1);
  }

  const inputSize = fs.statSync(srcPath).size;
  const inputMeta = await sharp(srcPath).metadata();

  let pipeline = sharp(srcPath);
  if (inputMeta.width > item.maxWidth) {
    pipeline = pipeline.resize(item.maxWidth, null, {
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: true,
    });
  }
  if (item.hero) {
    pipeline = pipeline.sharpen({ sigma: 0.4, m1: 0.4, m2: 0.2 });
  }

  await pipeline.webp({ quality: item.quality, effort: 6 }).toFile(destPath);

  const outputMeta = await sharp(destPath).metadata();
  const outputSize = fs.statSync(destPath).size;

  report.push({
    originalFile: item.src.match(/centroComercial_\d+/)?.[0] || item.src,
    newName: item.dest,
    input: { width: inputMeta.width, height: inputMeta.height, bytes: inputSize },
    output: { width: outputMeta.width, height: outputMeta.height, bytes: outputSize },
    reductionPct: Math.round((1 - outputSize / inputSize) * 100),
  });
}

console.log(JSON.stringify(report, null, 2));
