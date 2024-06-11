// 引用依赖
import xmz from '#xmz';
import xmz_ from '#xmz_';
import fetch from 'node-fetch';

const func = 'listen_offline';

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
    const token = await xmz_.config(func,'token');
    const qq = await xmz_.config(func,'qq');
    let name = await xmz_.config(func,'name');
    if (name=='') {
      name = Bot.nickname;
    }
    const url = `http://plugin.xmz.life/apps/listen_offline/send.php?phone=${phone}&qq=${qq}&token=${token}&uin=${Bot.uin}`;
    let json = await fetch(url);
    json = await json.json();
    var Json = json;
    if (Json.state=='成功') {
        logger.info('[小米粥插件]掉线监听短信发送成功');
    } else {
        logger.error('[小米粥插件]掉线监听短信发送失败：\n'+Json.state);
    }
});