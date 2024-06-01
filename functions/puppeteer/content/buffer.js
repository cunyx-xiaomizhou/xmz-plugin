import puppeteer from 'puppeteer';
import { Buffer } from 'buffer';
async function buffer(htmlString, viewportWidth = 1920, viewportHeight = 1080) {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: viewportWidth, height: viewportHeight });
    await page.setContent(htmlString);
    await page.waitForTimeout(2000); // 等待2秒加载图片或字体包等资源
    const screenshotBuffer = await page.screenshot({ encoding: 'binary' });
    const bufferData = Buffer.from(screenshotBuffer, 'binary');
    await browser.close();
    return bufferData;
  } catch (err) {
    Bot.logger.err('图片生成失败：', err);
    return false;
  }
}

export { buffer };