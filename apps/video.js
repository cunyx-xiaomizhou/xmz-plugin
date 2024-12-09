import plugin from './../../../lib/plugins/plugin.js';
export class xmz_plugin_video extends plugin {
  constructor () {
    super({
      name:"短视频解析",
      dsc:"使用小米粥工具箱短视频聚合解析功能",
      event:"message",
      priority:100,/*优先级*/
      rule:[
        {
          reg:/http(s):\/\//gi,
          fnc:"video"
        }
      ]
    });
  }
}