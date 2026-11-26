import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = process.env.AUDIT_URL || 'http://127.0.0.1:4173';
const SHOTS_DIR = path.resolve('audit/screenshots');
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
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 250));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));

    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) =>
        img.decode().catch(() => null),
      ),
    );
  });

  return page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map((img) => {
      const rect = img.getBoundingClientRect();
      const style = window.getComputedStyle(img);
      return {
        alt: img.alt.slice(0, 40),
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
  const imageResponses = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });
  page.on('requestfailed', (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });
  page.on('response', (res) => {
    if (res.url().includes('/images/')) {
      imageResponses.push({
        url: res.url(),
        status: res.status(),
        contentType: res.headers()['content-type'],
      });
    }
  });

  const report = {
    routes: {},
    widthsOverflow: {},
    filtersAndView: {},
    gallery: {},
    briefing: {},
    mobileMenu: {},
    keyboard: {},
    images: [],
    consoleErrors,
    pageErrors,
    failedRequests,
    imageResponsesCount: 0,
    invalidImageResponses: [],
  };

  // 1. Validate all routes
  for (const route of ROUTES) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    const h1 = await page.locator('h1').first().textContent();
    report.routes[route] = { status: 'ok', h1: h1?.trim() };
  }

  // 2. Validate responsive widths & overflow on Home
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }));
    report.widthsOverflow[w] = overflow;
  }

  // 3. Screenshots: Hero & Home Desktop (1440)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SHOTS_DIR, '01-hero-desktop.png') });

  const homeImages = await scrollAndValidateImages(page);
  report.images.push(...homeImages.map((i) => ({ route: '/', ...i })));
  await page.screenshot({ path: path.join(SHOTS_DIR, '02-home-full-desktop.png'), fullPage: true });

  // 4. Tablet (768)
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SHOTS_DIR, '04-home-tablet.png') });

  // 5. Mobile full & Mobile Menu (390)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await scrollAndValidateImages(page);
  await page.screenshot({ path: path.join(SHOTS_DIR, '03-home-full-mobile.png'), fullPage: true });

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(150);
  await page.getByRole('button', { name: /Abrir menu/i }).click();
  await page.waitForSelector('#mobile-editorial-menu');
  await page.waitForTimeout(150);
  const mobileOverflow = await page.evaluate(() => document.body.style.overflow);
  await page.screenshot({ path: path.join(SHOTS_DIR, '12-menu-mobile-aberto.png') });
  await page.keyboard.press('Escape');
  const mobileClosed = (await page.locator('#mobile-editorial-menu').count()) === 0;
  report.mobileMenu = { opened: true, bodyScrollLocked: mobileOverflow === 'hidden', closedOnEscape: mobileClosed };

  // 6. Projects filters + List view (1440)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/projetos`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Residencial' }).click();
  const filteredCount = await page.locator('article').count();
  await page.screenshot({ path: path.join(SHOTS_DIR, '05-projetos-filtros.png') });

  await page.getByRole('button', { name: 'Todos' }).click();
  await page.getByRole('button', { name: 'Lista' }).click();
  const listUrl = page.url();
  await page.screenshot({ path: path.join(SHOTS_DIR, '06-projetos-lista.png') });
  report.filtersAndView = { residencialCount: filteredCount, listUrl };

  // 7. Project detail + Fullscreen gallery
  await page.goto(`${BASE_URL}/projetos/casa-horizonte`, { waitUntil: 'networkidle' });
  const detailImages = await scrollAndValidateImages(page);
  report.images.push(...detailImages.map((i) => ({ route: '/projetos/casa-horizonte', ...i })));
  await page.screenshot({ path: path.join(SHOTS_DIR, '07-projeto-individual.png') });

  await page.getByRole('button', { name: /Ampliar fotografia principal/i }).click();
  await page.waitForSelector('[role="dialog"]');
  const initialIndicator = await page.locator('[role="dialog"]').textContent();
  await page.keyboard.press('ArrowRight');
  await page.evaluate(async () => {
    const img = document.querySelector('[role="dialog"] img');
    if (img) await img.decode().catch(() => null);
  });
  await page.waitForTimeout(150);
  const nextIndicator = await page.locator('[role="dialog"]').textContent();
  await page.screenshot({ path: path.join(SHOTS_DIR, '08-galeria-fullscreen.png') });
  await page.keyboard.press('Escape');
  const galleryClosed = (await page.locator('[role="dialog"]').count()) === 0;
  report.gallery = {
    opened: true,
    advancedWithArrowRight: initialIndicator?.includes('01 / 03') && nextIndicator?.includes('02 / 03'),
    closedWithEscape: galleryClosed,
  };

  // 8. Studio & Method
  await page.goto(`${BASE_URL}/estudio`, { waitUntil: 'networkidle' });
  await scrollAndValidateImages(page);
  await page.screenshot({ path: path.join(SHOTS_DIR, '09-estudio.png') });

  await page.goto(`${BASE_URL}/metodo`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SHOTS_DIR, '10-metodo.png') });

  // 9. Briefing interativo
  await page.goto(`${BASE_URL}/contato`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Residencial/i }).click();
  await page.getByRole('button', { name: /Avançar para área/i }).click();
  await page.getByRole('button', { name: /300 m² a 500 m²/i }).click();
  await page.getByRole('button', { name: /Avançar para estilo/i }).click();
  await page.getByRole('button', { name: /Contemporâneo/i }).click();
  await page.getByRole('button', { name: /Revisar resumo/i }).click();
  await page.getByRole('button', { name: /Confirmar simulação/i }).click();
  const confirmedText = await page.locator('text=Briefing demonstrativo concluído.').isVisible();
  await page.screenshot({ path: path.join(SHOTS_DIR, '11-briefing-interativo.png') });
  report.briefing = { completedFourSteps: confirmedText };

  // 10. Keyboard navigation check on Home
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const activeTag = await page.evaluate(() => document.activeElement?.tagName);
  report.keyboard = { tabMovedFocusTo: activeTag };

  report.imageResponsesCount = imageResponses.length;
  report.invalidImageResponses = imageResponses.filter(
    (r) => r.status !== 200 || !r.contentType?.includes('image/webp'),
  );

  fs.writeFileSync(path.resolve('audit/playwright-report.json'), JSON.stringify(report, null, 2));
  console.log('Audit complete. Console errors:', consoleErrors.length, 'Page errors:', pageErrors.length, 'Failed requests:', failedRequests.length);
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
