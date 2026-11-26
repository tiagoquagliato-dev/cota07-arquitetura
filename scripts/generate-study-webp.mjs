import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const RAW_DIR = path.resolve('raw-images');
const OUT_DIR = path.resolve('public/images');

fs.mkdirSync(RAW_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const ASSETS = [
  { id: 'horizonte-exterior', title: 'CASA HORIZONTE', subtitle: '01 / ELEVACAO PRINCIPAL', width: 1920, height: 1080, tone: 'dark' },
  { id: 'horizonte-interior', title: 'CASA HORIZONTE', subtitle: '02 / ESTAR INTEGRADO', width: 1920, height: 1080, tone: 'concrete' },
  { id: 'horizonte-piscina', title: 'CASA HORIZONTE', subtitle: '03 / ESPELHO DE AGUA', width: 1600, height: 1200, tone: 'oliva' },
  { id: 'patio-exterior', title: 'CASA PATIO', subtitle: '01 / VOLUMETRIA EXTERIOR', width: 1600, height: 1200, tone: 'concrete' },
  { id: 'patio-jardim', title: 'CASA PATIO', subtitle: '02 / JARDIM CENTRAL', width: 1200, height: 1500, tone: 'oliva' },
  { id: 'patio-interior', title: 'CASA PATIO', subtitle: '03 / GALERIA INTERNA', width: 1920, height: 1080, tone: 'dark' },
  { id: 'materia-estar', title: 'APARTAMENTO MATERIA', subtitle: '01 / ESTAR SOCIAL', width: 1920, height: 1080, tone: 'concrete' },
  { id: 'materia-cozinha', title: 'APARTAMENTO MATERIA', subtitle: '02 / ILHA MONOLITICA', width: 1600, height: 1200, tone: 'dark' },
  { id: 'materia-detalhe', title: 'APARTAMENTO MATERIA', subtitle: '03 / DETALHE TATIL', width: 1200, height: 1500, tone: 'oliva' },
  { id: 'pavilhao-exterior', title: 'PAVILHAO SETE', subtitle: '01 / PORTICO ESTRUTURAL', width: 1920, height: 1080, tone: 'dark' },
  { id: 'pavilhao-interior', title: 'PAVILHAO SETE', subtitle: '02 / ATRIO DE CONVIVENCIA', width: 1920, height: 1080, tone: 'concrete' },
  { id: 'pavilhao-detalhe', title: 'PAVILHAO SETE', subtitle: '03 / JUNTA CONSTRUTIVA', width: 1200, height: 1500, tone: 'oliva' },
  { id: 'studio-editorial', title: 'COTA.07 ESTUDIO', subtitle: 'MESA DE MATERIAIS E MAQUETE', width: 1600, height: 1200, tone: 'concrete' },
];

const WIDTHS = [640, 1280, 1920];

function buildStudySvg(asset) {
  const { width, height, title, subtitle, tone } = asset;
  const palettes = {
    dark: { bg: '#202321', fg: '#EAE8E1', accent: '#787D60', grid: 'rgba(234,232,225,0.12)', slab: '#2D302D' },
    concrete: { bg: '#D6D3C9', fg: '#191B1A', accent: '#787D60', grid: 'rgba(25,27,26,0.12)', slab: '#C2BFB4' },
    oliva: { bg: '#45483A', fg: '#EAE8E1', accent: '#96978F', grid: 'rgba(234,232,225,0.14)', slab: '#36392D' },
  };
  const p = palettes[tone] || palettes.dark;

  const cx = Math.round(width * 0.5);
  const cy = Math.round(height * 0.5);
  const boxW = Math.round(width * 0.64);
  const boxH = Math.round(height * 0.44);
  const bx = Math.round((width - boxW) / 2);
  const by = Math.round((height - boxH) / 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${p.bg}" />
  <rect x="${bx}" y="${by}" width="${boxW}" height="${Math.round(boxH * 0.35)}" fill="${p.slab}" />
  <rect x="${bx + Math.round(boxW * 0.18)}" y="${by + Math.round(boxH * 0.35)}" width="${Math.round(boxW * 0.64)}" height="${Math.round(boxH * 0.55)}" fill="none" stroke="${p.fg}" stroke-width="2" opacity="0.45" />
  <line x1="0" y1="${cy}" x2="${width}" y2="${cy}" stroke="${p.grid}" stroke-width="1.5" />
  <line x1="${cx}" y1="0" x2="${cx}" y2="${height}" stroke="${p.grid}" stroke-width="1.5" />
  <line x1="${bx}" y1="${by - 36}" x2="${bx + boxW}" y2="${by - 36}" stroke="${p.accent}" stroke-width="2" />
  <line x1="${bx}" y1="${by - 48}" x2="${bx}" y2="${by - 24}" stroke="${p.accent}" stroke-width="2" />
  <line x1="${bx + boxW}" y1="${by - 48}" x2="${bx + boxW}" y2="${by - 24}" stroke="${p.accent}" stroke-width="2" />
  <rect x="${Math.round(width * 0.05)}" y="${Math.round(height * 0.06)}" width="${Math.round(width * 0.9)}" height="${Math.round(height * 0.88)}" fill="none" stroke="${p.grid}" stroke-width="1.5" />
  <text x="${Math.round(width * 0.075)}" y="${Math.round(height * 0.13)}" fill="${p.fg}" font-family="monospace" font-size="${Math.round(width * 0.015)}" letter-spacing="4" opacity="0.85">${title} · ${subtitle}</text>
  <text x="${Math.round(width * 0.075)}" y="${Math.round(height * 0.89)}" fill="${p.fg}" font-family="monospace" font-size="${Math.round(width * 0.012)}" letter-spacing="3" opacity="0.65">ESTUDO TECNICO PROVISORIO · AGUARDANDO FOTOGRAFIA EXTERNA (HTTP 429)</text>
</svg>`;
}

function findRawFile(id) {
  for (const ext of ['.png', '.jpg', '.jpeg', '.webp']) {
    const candidate = path.join(RAW_DIR, `${id}${ext}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

async function run() {
  let fromRaw = 0;
  let fromStudy = 0;

  for (const asset of ASSETS) {
    const rawFile = findRawFile(asset.id);
    const sourceBuffer = rawFile ? fs.readFileSync(rawFile) : Buffer.from(buildStudySvg(asset));
    if (rawFile) fromRaw++;
    else fromStudy++;

    for (const targetW of WIDTHS) {
      const targetH = Math.round((asset.height / asset.width) * targetW);
      const outPath = path.join(OUT_DIR, `${asset.id}-${targetW}.webp`);
      await sharp(sourceBuffer)
        .resize(targetW, targetH, { fit: 'cover' })
        .webp({ quality: 82 })
        .toFile(outPath);
    }
  }

  console.log(`Generated WebP variants for ${ASSETS.length} assets (${fromRaw} from raw-images, ${fromStudy} provisional study plates).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
