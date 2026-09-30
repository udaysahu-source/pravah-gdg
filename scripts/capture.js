import { firefox } from 'playwright';
import path from 'path';

const targets = [
  {
    name: 'bunkd',
    url: 'https://bunk-d.vercel.app/',
    output: 'public/assets/bunkd_real.png',
    viewport: { width: 1280, height: 800 },
    wait: 5000,
  },
  {
    name: 'sanket',
    url: 'https://team-leaf-prototype.vercel.app/feed',
    output: 'public/assets/sanket_real.png',
    viewport: { width: 1280, height: 800 },
    wait: 5000,
  },
  {
    name: 'labelsure',
    url: 'https://labelcheck-rho.vercel.app/',
    output: 'public/assets/labelsure_real.png',
    viewport: { width: 1280, height: 800 },
    wait: 5000,
  },
  {
    name: 'bro_or_fraud',
    url: 'https://bro-or-fraud.vercel.app/',
    output: 'public/assets/bro_or_fraud_real.png',
    viewport: { width: 1280, height: 800 },
    wait: 5000,
  },
];

async function capture() {
  console.log('Launching Firefox...');
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({
    colorScheme: 'dark',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0',
  });

  for (const target of targets) {
    console.log(`Navigating to ${target.name} (${target.url})...`);
    try {
      const page = await context.newPage();
      await page.setViewportSize(target.viewport);
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      console.log(`Waiting ${target.wait}ms for hydration...`);
      await page.waitForTimeout(target.wait);

      await page.screenshot({ path: target.output, fullPage: false });
      console.log(`Captured ${target.name} -> ${target.output}`);
      await page.close();
    } catch (err) {
      console.error(`Error capturing ${target.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('Finished all captures.');
}

capture();
