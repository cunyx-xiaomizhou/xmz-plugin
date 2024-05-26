import puppeteer from 'puppeteer';
async function base64(url, viewportWidth = 1920, viewportHeight = 1080) {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: viewportWidth, height: viewportHeight });
    await page.goto(url, { waitUntil: 'networkidle0' });
    const base64Image = await page.screenshot({ type: 'png', encoding: 'base64', fullPage: true });
    await browser.close();
    return base64Image;
  } catch (err) {
    throw err;
  }
}
export { base64 };