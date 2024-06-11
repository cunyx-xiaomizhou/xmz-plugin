// 引用依赖
import xmz from '#xmz';
import xmz_ from '#xmz_';

import plugin from './../../../lib/plugins/plugin.js';
export class listen_offline_xmz_plugin extends plugin {
  constructor () {
    super({
      name:"机器人掉线监听",
      dsc:"机器人掉线监听设置信息",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?帮助",fnc:"help",}
      ]
    });
  }
}

// 下线监听并发送短信
Bot.on("system.offline", data => {
    // 具体操作
});