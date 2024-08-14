import xmz from '#xmz';
import xmz_ from '#xmz_';

import plugin from './../../../lib/plugins/plugin.js';
export class xmz_plugin_loading extends plugin {
  constructor () {
    super({
      name:"重载配置",
      dsc:"小米粥插件重新初始化",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:/^#?(小米粥|xmz)(插件|(-)?plugin)(初始化|重载(配置)?)/gi,fnc:"loading"}
      ]
    });
  }
  async loading (e) {
    const state = await xmz.xmz(e);
    if (!state[0]) {
      e.reply('❌ 无权限，'+state[1],true);
      return true;
    }
    const defDir = xmz_.path + '/config/default';
    const configDir = xmz_.path + '/config/config';
    try {
      await xmz.loading(configDir,defDir);
      e.reply('✅ 小米粥插件重新初始化成功！',true);
    } catch (err) {
      e.reply('❌ 重载失败：\n'+err,true);
    }
  }
}