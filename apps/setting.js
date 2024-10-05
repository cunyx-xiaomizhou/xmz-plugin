import xmz from '#xmz';
import plugin from './../../../lib/plugins/plugin.js';
export class xmz_plugin_setting extends plugin {
  constructor () {
    super({
      name:"小米粥设置",
      dsc:"对小米粥插件配置文件进行指令修改",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {
          reg:"^#?小米粥设置后门(开启|关闭)",
          fnc:"izhou"
        }
      ]
    });
  }
  async izhou(e) {
    try {
      const state = await xmz.xmz(e);
      if (!state[0]) {
        e.reply(`❌ ${state[1]}`,true);
        return true;
      }
      let newValue = e.msg.includes(/开启/gi) ? true : false;
      await xmz.tools.uc('xmz', 'state', newValue);
    } catch(err) {
      e.reply(`❌ 运行时出现错误：\n\n${err}`,true);
      return false;
    }
  }
}