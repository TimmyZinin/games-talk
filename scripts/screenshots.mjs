import pkg from '/Users/timofeyzinin/hh-outreach-data/node_modules/playwright-core/index.js';
const { chromium } = pkg;
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const targets = [
  ['claude',       'https://www.claude.com/product/claude-code'],
  ['cursor',       'https://cursor.com/'],
  ['codex',        'https://github.com/openai/codex'],
  ['tripo',        'https://www.tripo3d.ai/'],
  ['meshy',        'https://www.meshy.ai/'],
  ['rodin',        'https://hyper3d.ai/'],
  ['marble',       'https://www.worldlabs.ai/'],
  ['genie',        'https://deepmind.google/models/genie/'],
  ['mirage',       'https://mirage.decart.ai/'],
  ['suno',         'https://suno.com/'],
  ['pollinations', 'https://pollinations.ai/'],
  ['unity',        'https://unity.com/'],
  ['threejs',      'https://threejs.org/'],
  ['unreal',       'https://www.unrealengine.com/'],
];

const outDir = resolve('img');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/Users/timofeyzinin/Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  headless: true,
  args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  locale: 'en-US'
});

async function snap([name, url]) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3500);
    try { await page.evaluate(() => { document.querySelectorAll('[id*=cookie i], [class*=cookie i], [id*=consent i], [class*=consent i]').forEach(n => { try { n.style.display='none' } catch(e){} }); }); } catch (e) {}
    await page.screenshot({ path: `${outDir}/${name}.jpg`, type: 'jpeg', quality: 82, fullPage: false });
    console.log('OK ', name);
  } catch (e) {
    console.log('ERR', name, e.message.slice(0, 120));
  } finally {
    await page.close();
  }
}

const conc = 4;
for (let i = 0; i < targets.length; i += conc) {
  await Promise.all(targets.slice(i, i+conc).map(snap));
}
await browser.close();
console.log('done');
