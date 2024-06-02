import puppeteer from 'puppeteer';
import { Buffer } from 'buffer';

/**
 * 生成网页截图并返回 Buffer
 * @param {string} htmlString - 要渲染为截图的 HTML 字符串.
 * @param {number} viewportWidth - 视口宽度，默认为 1920.
 * @param {number} viewportHeight - 视口高度，默认为 1080.
 * @returns {Promise<Buffer|false>} - 返回生成的截图的 Buffer 或者 false 如果出现错误.
 */

async function buffer(htmlString, viewportWidth = 1920, viewportHeight = 1080) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new", // 使用新的Headless模式.
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: viewportWidth, height: viewportHeight });
    await page.setContent(htmlString, { waitUntil: 'domcontentloaded' });
    // 等待页面完全加载.
    await page.evaluateHandle('document.fonts.ready');
    // 自动调整页面高度.
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    await page.setViewport({ width: viewportWidth, height: Math.ceil(height) });
    // 延时等待图片等资源加载完成.
    await page.waitForTimeout(5000);
    const screenshotBuffer = await page.screenshot({ encoding: 'binary', fullPage: true });
    const bufferData = Buffer.from(screenshotBuffer, 'binary');
    await browser.close();
    return bufferData;
  } catch (err) {
    logger.error('图片生成失败：', err); // 使用logger函数记录错误.
    if (browser) {
      await browser.close();
    }
    return false;
  }
}

export { buffer };

