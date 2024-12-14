import xmz from '#xmz';
import xmz_ from '#xmz_';
import fetch from 'node-fetch';
import plugin from './../../../lib/plugins/plugin.js';
export class plugin_name extends plugin {
  constructor () {
    super({
      name:"随机表情包",
      dsc:"调用小米粥工具箱获取随机表情包图像并发送",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:/^#?随机奶龙/,fnc:'NaiLong'},
        {reg:/^#?随机Doro/gi,fnc:'Doro'}
      ]
    });
  }
  async NaiLong(e) { await s(e, 'NaiLong'); } 
  async Doro(e) { await s(e, 'Doro'); }
}
/**
 * 以下为请求逻辑，若不懂相关内容，请勿更改
 */
async function s(e, f) {
  return await r(e, await pu(await api_key(e, f), f));
}
async function api_key(e, f) {
if (!await xmz_.config('sj_Image', 'index')||!await xmz_.config('sj_Image', f)) return false;
  const uid = await xmz_.config('xmzTools', 'uid');
  const api_key = await xmz_.config('xmzTools', 'api_key');
  if (!uid||!api_key||uid==''||api_key=='') {
    if (await xmz_.config('video', 'reply')) {
      e.reply('❌ 解析失败，缺少小米粥工具箱uid或api_key',true);
      return false;
    }
  }
  return [uid, api_key];
}
async function r(e, u) {
  let json;
  try {
    json = await (await fetch(u)).json();
    if (json.code == 200) {
      e.reply(segment.image(json.data.url));
    } else {
      e.reply('❌ API未返回数据：\n'+json.msg,true);
    }
  } catch (err) {
    e.reply('❌ API请求时出现异常：\n'+err,true);
  }
}
async function pu(api, f) {
  const url = 'https://tools.xmz.netkj.com/api/API/';
  return `${url}sj_${f}?uid=${api[0]}&api_key=${[api[1]]}`;
}