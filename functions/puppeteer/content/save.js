import puppeteer from 'puppeteer';

async function save(htmlString, savePath, viewportWidth = 1920, viewportHeight = 1080) {
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
    await page.screenshot({ path: savePath, fullPage: true });
    await browser.close();
    return true;
  } catch (err) {
    console.error('图片生成失败：', err);
    return false;
  }
}
export { save };