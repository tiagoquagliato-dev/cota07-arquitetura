import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const RAW_DIR = path.resolve('raw-images');
const OUT_DIR = path.resolve('public/images');

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const ASSETS = [
  { id: 'horizonte-exterior', width: 1920, height: 1080 },
  { id: 'horizonte-interior', width: 1920, height: 1080 },
  { id: 'horizonte-piscina', width: 1600, height: 1200 },
  { id: 'patio-exterior', width: 1600, height: 1200 },
  { id: 'patio-jardim', width: 1200, height: 1500 },
  { id: 'patio-interior', width: 1920, height: 1080 },
  { id: 'materia-estar', width: 1920, height: 1080 },
  { id: 'materia-cozinha', width: 1600, height: 1200 },
  { id: 'materia-detalhe', width: 1200, height: 1500 },
  { id: 'pavilhao-exterior', width: 1920, height: 1080 },
  { id: 'pavilhao-interior', width: 1920, height: 1080 },
  { id: 'pavilhao-detalhe', width: 1200, height: 1500 },
  { id: 'studio-editorial', width: 1600, height: 1200 },
];

function getTargetWidths(maxWidth) {
  if (maxWidth >= 1920) return [640, 1280, 1920];
  if (maxWidth >= 1600) return [640, 1280, 1600];
  return [640, maxWidth];
}

function findRawFile(id) {
  for (const ext of ['.png', '.jpg', '.jpeg', '.webp']) {
    const candidate = path.join(RAW_DIR, `${id}${ext}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

async function run() {
  for (const asset of ASSETS) {
    const rawFile = findRawFile(asset.id);
    if (!rawFile) {
      throw new Error(`Missing raw asset for ${asset.id} in raw-images/`);
    }

    const meta = await sharp(rawFile).metadata();
    const origW = meta.width || asset.width;
    const targetWidths = getTargetWidths(Math.min(asset.width, origW));

    for (const targetW of targetWidths) {
      const targetH = Math.round((asset.height / asset.width) * targetW);
      const outPath = path.join(OUT_DIR, `${asset.id}-${targetW}.webp`);
      await sharp(rawFile)
        .resize(targetW, targetH, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outPath);
    }
  }

  console.log(`Generated non-upscaled WebP variants for ${ASSETS.length}/13 definitive assets.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
