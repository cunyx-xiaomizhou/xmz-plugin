import xmz_ from '#xmz_';
import fetch from 'node-fetch';
import plugin from './../../../lib/plugins/plugin.js';
export class random_ImageXmzPlugin extends plugin {
  constructor () {
    super({
      name:"随机表情包",
      dsc:"调用小米粥工具箱获取随机表情包图像并发送",
      event:"message", 
      priority:1,
      rule:[
        {reg:/^#?随机奶龙/,fnc:'NaiLong'},
        {reg:/^#?随机Doro/i,fnc:'Doro'},
        {reg:/^#?随机乌萨奇/,fnc:'WuSaQi'},
        {reg:/^#?随机懒羊羊/,fnc:'Paddi'},
        {reg:/^#?随机美女(视频)?/,fnc:'BV'},
        {reg:/^#?随机Loopy/i,fnc:'Loopy'},
        {reg:/^#?随机小埋/,fnc:'XiaoMai'},
        {reg:/^#?随机龙图/,fnc:'Loong'},
        {reg:/^#?随机熊猫/,fnc:'Panda'},
        {reg:/^#?随机柴郡猫?/,fnc:'ChaiJun'},
        {reg:/^#?随机(小)?熊二/,fnc:'XiongEr'},
        {reg:/^#?随机库洛米/,fnc:'Kuromi'},
        {reg:/^#?随机小八/,fnc:'XiaoBa'}
      ]
    });
  }
  async NaiLong(e) { await s(e, 'NaiLong'); }
  async Doro(e) { await s(e, 'Doro'); }
  async WuSaQi(e) { await s(e, 'WuSaQi'); }
  async Paddi(e) { await s(e, 'Paddi'); }
  async BV(e) { await s(e, 'BV', true); }
  async Loopy(e) { await s(e, 'Loopy'); }
  async XiaoMai(e) { await s(e, 'XiaoMai'); }
  async Loong(e) { await s(e, 'Loong'); }
  async Panda(e) { await s(e, 'Panda'); }
  async ChaiJun(e) { await s(e, 'ChaiJun'); }
  async XiongEr(e) { await s(e, 'XiongEr'); }
  async Kuromi(e) { await s(e, 'Kuromi'); }
  async XiaoBa(e) { await s(e, 'XiaoBa'); }
}

async function s(e, f, is_video = false) {
  const index = await xmz_.config('sj_Image', 'index');
  const func = await xmz_.config('sj_Image', f);
  if (!index || func === false) {
    return false;
  }
  const uid = await xmz_.config('xmzTools', 'uid');
  const api_key = await xmz_.config('xmzTools', 'api_key');
  if (!uid||!api_key||uid==''||api_key=='') {
    e.reply('❌ 请求失败，缺少小米粥工具箱uid或api_key',true);
    return false;
  }

  const url = `https://tools.xmz.netkj.com/api/API/suiji/${f}?uid=${uid}&api_key=${api_key}`;
  
  try {
    const json = await (await fetch(url)).json();
    if (json.code == 200) {
      if (is_video == true) {
        e.reply('这是一个视频，我尝试发送喽~',true);
        try {
          e.reply(segment.video(json.data.url));
        } catch (err) {
          e.reply('❌ 哦天哪！发送失败了，原因如下：\n'+err);
        }
      } else {
        e.reply(segment.image(json.data.url));
      }
    } else {
      e.reply('❌ API未返回数据：\n'+json.msg,true);
    }
  } catch (err) {
    e.reply('❌ API请求时出现异常：\n'+err,true);
  }
}