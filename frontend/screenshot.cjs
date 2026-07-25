const { createServer } = require('vite');
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    const server = await createServer({
      root: __dirname,
      server: { port: 5174 },
    });
    await server.listen();
    console.log('Server running on 5174');

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const destDir =
      'C:/Users/Bayzid/.gemini/antigravity-cli/brain/460efe5b-e439-446f-a88c-4d230dd6b767';

    // Desktop Screenshot (Viewport only)
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
    await wait(2500); // allow framer-motion animations to complete
    await page.screenshot({
      path: path.join(destDir, 'desktop_phase6.png'),
      fullPage: true,
    });
    console.log('Desktop screenshot taken.');

    // Navbar closeup
    const headerElement = await page.$('header');
    if (headerElement) {
      await headerElement.screenshot({
        path: path.join(destDir, 'navbar_closeup.png'),
      });
      console.log('Navbar closeup taken.');
    }

    // Mobile Screenshot (Viewport only)
    await page.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
    });
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
    await wait(2500);
    await page.screenshot({
      path: path.join(destDir, 'mobile_phase6.png'),
      fullPage: true,
    });

    console.log('Mobile screenshot taken.');

    // Desktop Github Section
    await page.setViewport({ width: 1440, height: 900 });
    const githubElement = await page.$('#github');
    if (githubElement) {
      await page.evaluate(() =>
        document.querySelector('#github').scrollIntoView()
      );
      await wait(1000);
      await githubElement.screenshot({
        path: path.join(destDir, 'github_section.png'),
      });
      console.log('Github section screenshot taken.');
    }

    // Open AI Assistant
    await wait(2000); // Wait for the button scale animation (1s delay)
    const aiButton = await page.$('button[aria-label="Open AI Assistant"]');
    if (aiButton) {
      await aiButton.click();
      await wait(1000); // Wait for modal animation
      await page.screenshot({
        path: path.join(destDir, 'ai_assistant.png'),
        fullPage: false,
      });
      console.log('AI Assistant screenshot taken.');
    }

    await browser.close();
    await server.close();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
