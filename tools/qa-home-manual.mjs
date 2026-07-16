/**
 * QA manual de Home — PAVIMENTCIVIL
 *
 * Requisitos:
 * - Servidor local en http://127.0.0.1:8765 (ej: python -m http.server 8765)
 * - Puppeteer disponible en el entorno Node (dependencia de desarrollo)
 *
 * Uso: node tools/qa-home-manual.mjs
 *
 * Comportamiento: solo validaciones locales de lectura (layout, anclas, lightbox, consola).
 * No modifica archivos, no hace commits ni ejecuta acciones destructivas.
 * Exit code 0 = PASS, 1 = FAIL.
 */
import puppeteer from 'puppeteer';

const BASE = 'http://127.0.0.1:8765';
const WIDTHS = [320, 375, 768, 1024, 1440];

const LINK_CHECKS = [
  { href: '/empresa/', name: 'empresa hub' },
  { href: '/servicios/', name: 'servicios hub' },
  { href: '/servicios/#complementarios', name: 'servicios complementarios' },
  { href: '/proyectos/#torre-cardenas', name: 'proyecto torre-cardenas' },
  { href: '/proyectos/#cabezo-de-torres', name: 'proyecto cabezo-de-torres' },
  { href: '/proyectos/#soria', name: 'proyecto soria' },
  { href: '/contacto/#formulario-contacto', name: 'contacto formulario' },
];

function colsFromComputed(style) {
  if (!style || style === 'none') return 1;
  const repeat = style.match(/repeat\((\d+)/);
  if (repeat) return Number(repeat[1]);
  return style.trim().split(/\s+/).filter(Boolean).length;
}

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(err.message));

const results = [];

for (const width of WIDTHS) {
  await page.setViewport({ width, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });

  const metrics = await page.evaluate(() => {
    function colsFromComputed(style) {
      if (!style || style === 'none') return 1;
      const repeat = style.match(/repeat\((\d+)/);
      if (repeat) return Number(repeat[1]);
      return style.trim().split(/\s+/).filter(Boolean).length;
    }

    const hero = document.querySelector('.home-hero');
    const trustGrid = document.querySelector('.home-trust__grid');
    const servicesGrid = document.querySelector('#servicios-teaser .home-services__grid');
    const aboutLayout = document.querySelector('.home-about__layout');
    const aboutMedia = document.querySelector('.home-about__media');
    const projectsGrid = document.querySelector('.home-projects__grid');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    const heroOverflow =
      hero &&
      (hero.scrollWidth > hero.clientWidth + 1 || hero.getBoundingClientRect().right > window.innerWidth + 1);
    const footerOverflow =
      footer &&
      (footer.scrollWidth > footer.clientWidth + 1 || footer.getBoundingClientRect().right > window.innerWidth + 1);

    // Scroll horizontal visible: overflow en main/sections (no nav, recortada por overflow-x:hidden)
    const contentOverflow = main
      ? [...main.querySelectorAll('section')].some((sec) => sec.getBoundingClientRect().right > window.innerWidth + 2)
      : false;
    const canScrollX = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;

    const aboutEmptyGap = (() => {
      if (!aboutLayout || !aboutMedia) return false;
      const layoutRect = aboutLayout.getBoundingClientRect();
      const mediaRect = aboutMedia.getBoundingClientRect();
      const content = document.querySelector('.home-about__content');
      const contentRect = content?.getBoundingClientRect();
      if (!contentRect) return false;
      const gap = layoutRect.bottom - Math.max(contentRect.bottom, mediaRect.bottom);
      return gap > 120;
    })();

    return {
      canScrollX,
      contentOverflow,
      heroOverflow,
      footerOverflow,
      trustCols: colsFromComputed(trustGrid ? getComputedStyle(trustGrid).gridTemplateColumns : ''),
      servicesCols: colsFromComputed(servicesGrid ? getComputedStyle(servicesGrid).gridTemplateColumns : ''),
      projectsCols: colsFromComputed(projectsGrid ? getComputedStyle(projectsGrid).gridTemplateColumns : ''),
      projectsCards: projectsGrid ? projectsGrid.children.length : 0,
      aboutEmptyGap,
      serviciosTeaserId: document.getElementById('servicios-teaser')?.id || null,
      serviciosId: document.getElementById('servicios')?.id || null,
    };
  });

  results.push({ width, ...metrics });
}

// Link checks from home page
await page.setViewport({ width: 1024, height: 900 });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
const homeLinks = await page.evaluate(() =>
  Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href'))
);
const linkResults = [];
for (const check of LINK_CHECKS) {
  const path = check.href.startsWith('/') ? check.href.slice(1) : check.href;
  const foundOnHome = homeLinks.some((h) => h === path || h === check.href || h?.endsWith(path));
  const url = `${BASE}${check.href.startsWith('/') ? check.href : '/' + check.href}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  let targetOk = !page.url().includes('chrome-error');
  if (check.href.includes('#')) {
    const id = check.href.split('#')[1];
    const hasAnchor = await page.evaluate((anchorId) => !!document.getElementById(anchorId), id);
    targetOk = targetOk && hasAnchor;
  }
  linkResults.push({ ...check, foundOnHome, targetOk });
}

// Lightbox keyboard + mouse
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await page.click('.home-projects__img');
const lightboxOpen = await page.evaluate(() => {
  const lb = document.getElementById('lightbox');
  return lb && !lb.hidden && lb.classList.contains('open');
});
await page.keyboard.press('ArrowRight');
const captionAfterNext = await page.evaluate(() => document.getElementById('lightboxCaption')?.textContent || '');
await page.keyboard.press('Escape');
const lightboxClosed = await page.evaluate(() => {
  const lb = document.getElementById('lightbox');
  return lb?.hidden || !lb?.classList.contains('open');
});
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
await page.click('.home-projects__img');
await page.waitForSelector('#lightbox.open', { timeout: 2000 });
await page.click('#lightboxClose');
await page.waitForFunction(() => document.getElementById('lightbox')?.hidden, { timeout: 1500 });
const lightboxClosedMouse = await page.evaluate(() => document.getElementById('lightbox')?.hidden);

await browser.close();

let failed = false;
console.log('=== QA MANUAL HOME ===');
for (const r of results) {
  const issues = [];
  if (r.contentOverflow) issues.push('scroll horizontal en contenido');
  if (r.heroOverflow) issues.push('hero overflow');
  if (r.footerOverflow) issues.push('footer overflow');
  if (r.aboutEmptyGap) issues.push('empresa teaser gap vacío');
  if (r.projectsCards !== 3) issues.push(`proyectos cards=${r.projectsCards}`);
  if (r.serviciosTeaserId !== 'servicios-teaser') issues.push('id servicios-teaser incorrecto');
  if (r.serviciosId) issues.push('existe id servicios legacy');

  if (r.width < 768) {
    if (r.servicesCols !== 1) issues.push(`servicios cols=${r.servicesCols} esperado 1`);
  } else if (r.width < 1024) {
    if (r.servicesCols !== 2) issues.push(`servicios cols=${r.servicesCols} esperado 2`);
    if (r.trustCols !== 2) issues.push(`confianza cols=${r.trustCols} esperado 2`);
  } else {
    if (r.servicesCols !== 3) issues.push(`servicios cols=${r.servicesCols} esperado 3`);
    if (r.trustCols !== 4) issues.push(`confianza cols=${r.trustCols} esperado 4`);
    if (r.projectsCols !== 3) issues.push(`proyectos cols=${r.projectsCols} esperado 3`);
  }

  const status = issues.length ? 'FAIL' : 'PASS';
  if (issues.length) failed = true;
  console.log(`${r.width}px: ${status}${issues.length ? ' — ' + issues.join('; ') : ''}`);
  console.log(
    `  confianza=${r.trustCols} servicios=${r.servicesCols} proyectos=${r.projectsCols} cards=${r.projectsCards} scrollX=${r.canScrollX}`
  );
}

console.log('\n=== ENLACES Y ANCLAS ===');
for (const l of linkResults) {
  const status = l.targetOk ? 'PASS' : 'FAIL';
  if (!l.targetOk) failed = true;
  console.log(`${l.name}: ${status} (en home: ${l.foundOnHome ? 'sí' : 'no'})`);
}

console.log('\n=== LIGHTBOX ===');
console.log(`abrir: ${lightboxOpen ? 'PASS' : 'FAIL'}`);
console.log(`flecha siguiente: ${captionAfterNext ? 'PASS' : 'FAIL'} (${captionAfterNext})`);
console.log(`cerrar Escape: ${lightboxClosed ? 'PASS' : 'FAIL'}`);
console.log(`cerrar ratón: ${lightboxClosedMouse ? 'PASS' : 'FAIL'}`);
if (!lightboxOpen || !lightboxClosed || !lightboxClosedMouse) failed = true;

console.log('\n=== CONSOLA ===');
if (consoleErrors.length) {
  failed = true;
  consoleErrors.forEach((e) => console.log('ERROR:', e));
} else {
  console.log('PASS — sin errores');
}

process.exit(failed ? 1 : 0);
