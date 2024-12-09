import xmz from '#xmz';
import xmz_ from '#xmz_';
import fetch from 'node-fetch';
import plugin from './../../../lib/plugins/plugin.js';
export class xmz_plugin_video extends plugin {
  constructor () {
    super({
      name:"短视频解析",
      dsc:"使用小米粥工具箱短视频聚合解析功能",
      event:"message",
      priority:-1,/*优先级高于截图*/
      rule:[
        {
          reg:/http(s):\/\//gi,
          fnc:"video"
        }
      ]
    });
  }
  async video(e) {
    if (await xmz_.config('video', 'sw')) return false;
    const uid = await xmz_.config('xmzTools', 'uid');
    const api_key = await xmz_.config('xmzTools', 'api_key');
    if (!uid||!api_key||uid==''||api_key=='') {
      if (await xmz_.config('video', 'reply')) {
        e.reply('❌ 解析失败，缺少小米粥工具箱uid或api_key',true);
        return false;
      }
    }
    const urls = await xmz.tools.exu(e.msg);
    let url = urls[0];
    const api_url = 'https://tools.xmz.netkj.com/api/API/video_url';
    let json;
    try {
      json = await (await fetch(`${api_url}?uid=${uid}&api_key=${api_key}&url=${url}`)).json();
      if (json.code == 200) {
        if (json.data.type == 1) {
          await xmz.tools.sendMsg(e, [`视频标题：${json.data.title}`, '视频封面', json.data.cover_url]);
          e.reply(segment.video(json.data.video_url));
        } else {
          let arr_index = ['图集标题：'+json.data.title, '图集封面：', json.data.cover_url];
          let send_arr = [...arr_index,...json.data.pics];
          await xmz.tools.sendMsg(e, send_arr);
        }
      } else {
        if (await xmz_.config('video', 'replyFail')) {
          e.reply(`❌${json.msg}`,true);
        }
      }
    } catch (err) {
      if (await xmz_.config('video', 'replyFail')) {
        e.reply(`❌ 出了点小问题：\n\n${err}`,true);
      }
    }
    return false;
  }
}