const { createServer } = require('vite');
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    const server = await createServer({
      root: 'C:/Users/Bayzid/portfolio',
      server: { port: 5176 },
    });
    await server.listen();
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const destDir = 'C:/Users/Bayzid/.gemini/antigravity-cli/brain/5b0f0cb1-9988-4a1e-841e-ae9f08776994';

    // Desktop
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5176', { waitUntil: 'networkidle0' });
    
    await page.evaluate(() => document.querySelector('#skills').scrollIntoView());
    await wait(2500);
    
    const skillsDesktop = await page.$('#skills');
    await skillsDesktop.screenshot({ path: path.join(destDir, 'skills_desktop.png') });
    console.log('Desktop screenshot taken.');

    // Mobile
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5176', { waitUntil: 'networkidle0' });
    
    await page.evaluate(() => document.querySelector('#skills').scrollIntoView());
    await wait(2500);
    
    const skillsMobile = await page.$('#skills');
    await skillsMobile.screenshot({ path: path.join(destDir, 'skills_mobile.png') });
    console.log('Mobile screenshot taken.');

    await browser.close();
    await server.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
