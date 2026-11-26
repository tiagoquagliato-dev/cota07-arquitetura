import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = process.env.AUDIT_URL || 'http://127.0.0.1:4173';
const SHOTS_DIR = path.resolve('audit/screenshots-m2');
fs.mkdirSync(SHOTS_DIR, { recursive: true });

const WIDTHS = [360, 390, 768, 1024, 1440, 1920];
const ROUTES = [
  '/',
  '/projetos',
  '/projetos/casa-horizonte',
  '/projetos/casa-patio',
  '/projetos/apartamento-materia',
  '/projetos/pavilhao-sete',
  '/estudio',
  '/metodo',
  '/contato',
  '/privacidade',
  '/rota-404-teste',
];

async function scrollAndValidateImages(page) {
  await page.evaluate(async () => {
    const step = 450;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 200));
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 150));

    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(imgs.map((img) => img.decode().catch(() => null)));
  });

  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map((img) => {
      const rect = img.getBoundingClientRect();
      const style = window.getComputedStyle(img);
      return {
        currentSrc: img.currentSrc,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        opacity: style.opacity,
        visible: rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && Number(style.opacity) > 0,
      };
    });
  });
}

async function run() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });
  page.on('requestfailed', (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  const report = {
    routes: {},
    widthsOverflow: {},
    explorer: {},
    filtersAndView: {},
    gallery: {},
    briefing: {},
    mobileMenu: {},
    images: [],
    consoleErrors,
    pageErrors,
    failedRequests,
  };

  // 1. Routes
  for (const route of ROUTES) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    const h1 = await page.locator('h1').first().textContent();
    report.routes[route] = { status: 'ok', h1: h1?.trim() };
  }

  // 2. Widths overflow
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    report.widthsOverflow[w] = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }));
  }

  // 3. M2.0 Hero 1440 + Explorer states + Full Home Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SHOTS_DIR, 'm2-hero-1440.png') });

  // Switch to Casa Pátio
  await page.getByRole('tab', { name: /Selecionar Casa Pátio/i }).click();
  await page.waitForTimeout(250);
  const patioTitle = await page.locator('h1').first().textContent();
  await page.screenshot({ path: path.join(SHOTS_DIR, 'm2-explorer-patio.png') });

  // Switch to Pavilhão Sete via Next button / tab
  await page.getByRole('tab', { name: /Selecionar Pavilhão Sete/i }).click();
  await page.waitForTimeout(250);
  const pavilhaoTitle = await page.locator('h1').first().textContent();
  await page.screenshot({ path: path.join(SHOTS_DIR, 'm2-explorer-pavilhao.png') });

  report.explorer = {
    switchedToPatio: patioTitle?.trim() === 'Casa Pátio',
    switchedToPavilhao: pavilhaoTitle?.trim() === 'Pavilhão Sete',
  };

  // Reset to Casa Horizonte for full page capture
  await page.getByRole('tab', { name: /Selecionar Casa Horizonte/i }).click();
  await page.waitForTimeout(200);
  const homeImages = await scrollAndValidateImages(page);
  report.images.push(...homeImages);
  await page.screenshot({ path: path.join(SHOTS_DIR, 'm2-home-full-1440.png'), fullPage: true });

  // 4. M2.0 Hero 390 + Full Home Mobile + Mobile Menu
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SHOTS_DIR, 'm2-hero-390.png') });
  await scrollAndValidateImages(page);
  await page.screenshot({ path: path.join(SHOTS_DIR, 'm2-home-full-390.png'), fullPage: true });

  await page.getByRole('button', { name: /Abrir menu/i }).click();
  await page.waitForSelector('#mobile-editorial-menu');
  const mobileOverflow = await page.evaluate(() => document.body.style.overflow);
  await page.keyboard.press('Escape');
  report.mobileMenu = {
    opened: true,
    bodyScrollLocked: mobileOverflow === 'hidden',
    closedOnEscape: (await page.locator('#mobile-editorial-menu').count()) === 0,
  };

  // 5. Projects filters + List view
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/projetos`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Residencial' }).click();
  report.filtersAndView = {
    residencialCount: await page.locator('article').count(),
    url: page.url(),
  };
  await page.getByRole('button', { name: 'Lista' }).click();

  // 6. Fullscreen Gallery
  await page.goto(`${BASE_URL}/projetos/casa-horizonte`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Ampliar fotografia principal/i }).click();
  await page.waitForSelector('[role="dialog"]');
  await page.keyboard.press('ArrowRight');
  const nextText = await page.locator('[role="dialog"]').textContent();
  await page.keyboard.press('Escape');
  report.gallery = {
    opened: true,
    advanced: nextText?.includes('02 / 03'),
    closed: (await page.locator('[role="dialog"]').count()) === 0,
  };

  // 7. Briefing
  await page.goto(`${BASE_URL}/contato`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Residencial/i }).click();
  await page.getByRole('button', { name: /Avançar para área/i }).click();
  await page.getByRole('button', { name: /300 m² a 500 m²/i }).click();
  await page.getByRole('button', { name: /Avançar para estilo/i }).click();
  await page.getByRole('button', { name: /Contemporâneo/i }).click();
  await page.getByRole('button', { name: /Revisar resumo/i }).click();
  await page.getByRole('button', { name: /Confirmar simulação/i }).click();
  report.briefing = {
    completed: await page.locator('text=Briefing demonstrativo concluído.').isVisible(),
  };

  fs.writeFileSync(path.resolve('audit/playwright-report-m2.json'), JSON.stringify(report, null, 2));
  console.log('M2.0 Audit complete. Console errors:', consoleErrors.length, 'Page errors:', pageErrors.length, 'Failed requests:', failedRequests.length);
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
