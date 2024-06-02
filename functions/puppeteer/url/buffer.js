import puppeteer from 'puppeteer';
import { Buffer } from 'buffer';
async function buffer(url, viewportWidth = 1920, viewportHeight = 1080) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: viewportWidth, height: viewportHeight });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    await page.setViewport({ width: viewportWidth, height: Math.ceil(height) });
    await page.waitForTimeout(5000);
    const screenshotBuffer = await page.screenshot({ encoding: 'binary', fullPage: true });
    const bufferData = Buffer.from(screenshotBuffer, 'binary');
    await browser.close();
    return bufferData;
  } catch (err) {
    logger.error('图片生成失败：', err); 
    if (browser) {
      await browser.close();
    }
    return false;
  }
}

export { buffer };