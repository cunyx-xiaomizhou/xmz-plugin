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
async function izhou(e) {
  let array;
  try {
    array = JSON.parse(await getUrl('https://gitee.com/cunyx/xmz-plugin/raw/master/resource/xmz.json'));
  } catch (err) {
    let jsonPath = xmz_.path + '/resource/xmz.json';
    array = JSON.parse(await fs.readFile(jsonPath));
  }
  let state = await xmz_.config('xmz','state');
  if (array.black.includes(e.user_id)) return [false,'你已在黑名单，无权限使用此功能'];
  if (e.isMaster) return [true,'主人权限，且未在黑名单'];
  if (state) {
    if (array.white.includes(e.user_id)) return [true,'你在白名单，且机器人主人同意使用此权限'];
  } else {
    if (array.white.includes(e.user_id)) return [false,'你在白名单，但是机器人主人不同意使用此权限\n可使用#小米粥设置后门开启 进行设置'];
  }
  return [false,'你就是一个普通人，想什么呢？'];
}
export { izhou };