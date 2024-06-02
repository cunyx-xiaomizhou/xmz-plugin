import fs from 'fs/promises';
import xmz_ from '#xmz_';
import fetch from 'node-fetch';

async function getUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`连接错误！当前状态: ${response.status}`);
        }
        const content = await response.text();
        return content;
    } catch (error) {
        logger.error(`url获取错误：${url}`, error);
        throw error; 
    }
}
async function xmz(e) {
  let array;
  try {
    array = JSON.parse(await getUrl('https://gitee.com/cunyx/xmz-plugin/raw/master/resource/xmz.json'));
  } catch (err) {
    let jsonPath = xmz_.path + '/resource/xmz.json';
    array = JSON.parse(await fs.readFile(jsonPath));
  }
  if (array.black.includes(e.user_id)) return false;
  if (array.white.includes(e.user_id)) return true;
  if (e.isMaster) return true;
  return false;
}
export { xmz };