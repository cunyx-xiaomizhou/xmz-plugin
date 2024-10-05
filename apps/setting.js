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
          fnc:"xmz"
        }
      ]
    });
  }
}