import puppeteer from 'puppeteer';
async function buffer(filePath, viewportWidth = 1920, viewportHeight = 1080) {
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
    const buffer = await page.screenshot({ fullPage: true, encoding: 'binary' });
    await browser.close();
    return buffer;
  } catch (err) {
    Bot.logger.err('html截图失败：', err);
    throw err;
  }
}
export { buffer };