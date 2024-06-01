import puppeteer from 'puppeteer';
import { Buffer } from 'buffer';

/**
 * 生成网页截图并返回 Buffer
 * @param {string} htmlString - 要渲染为截图的 HTML 字符串
 * @param {number} viewportWidth - 视口宽度，默认为 1920
 * @param {number} viewportHeight - 视口高度，默认为 1080
 * @returns {Promise<Buffer|false>} - 返回生成的截图的 Buffer 或者 false 如果出现错误
 */
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
    await page.waitForNavigation({ waitUntil: 'networkidle2' }); // 等待网络空闲状态
    const screenshotBuffer = await page.screenshot({ encoding: 'binary' });
    const bufferData = Buffer.from(screenshotBuffer, 'binary');
    await browser.close();
    return bufferData;
  } catch (err) {
    logger.error('图片生成失败：', err); // 使用 logger 函数记录错误
    return false;
  }
}

export { buffer };
