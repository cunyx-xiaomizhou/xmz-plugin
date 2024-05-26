import fs from 'fs';
import puppeteer from 'puppeteer';
async function save(filePath, savePath, viewportWidth = 1920, viewportHeight = 1080) {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: viewportWidth, height: viewportHeight });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: savePath, fullPage: true });
    await browser.close();
    return true;
  } catch (err) {
    Bot.logger.err('图片生成失败：', err);
    return false;
  }
}
export { save };