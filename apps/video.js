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
    xmz.tools.sendMsg(e, ['你好','我不好'])
  }
}