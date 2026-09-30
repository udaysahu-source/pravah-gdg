import { firefox } from 'playwright';
import { spawn } from 'child_process';

async function verifyFull() {
  const server = spawn('npx', ['vite', 'preview', '--port', '4174'], {
    cwd: process.cwd(),
    stdio: 'pipe',
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const browser = await firefox.launch({ headless: true });
  
  // Desktop full page
  const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageDesktop = await ctxDesktop.newPage();
  await pageDesktop.goto('http://localhost:4174', { waitUntil: 'networkidle' });
  await pageDesktop.screenshot({ path: 'dist/full-desktop.png', fullPage: true });
  await ctxDesktop.close();

  // Mobile full page
  const ctxMobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pageMobile = await ctxMobile.newPage();
  await pageMobile.goto('http://localhost:4174', { waitUntil: 'networkidle' });
  await pageMobile.screenshot({ path: 'dist/full-mobile.png', fullPage: true });
  await ctxMobile.close();

  await browser.close();
  server.kill();
  console.log('Full-page screenshots captured.');
}

verifyFull().catch((err) => {
  console.error(err);
  process.exit(1);
});
