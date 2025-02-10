import xmz from '#xmz';
import xmz_ from '#xmz_';
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
        },
        {
          reg: /#?(xmz|小米粥)设置(新增|删除)(全局|禁言)(黑|白)名单(.*)?/gi,
          fnc: 'updateMemberList'
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
      let newValue = e.msg.includes('开启') ? true : false;
      await xmz.tools.uc('xmz', 'state', newValue);
      let cond = newValue ? '开启' : '关闭';
      e.reply(`✅ 小米粥插件后门已更改为：${cond}`,true);
    } catch(err) {
      e.reply(`❌ 运行时出现错误：\n\n${err}`,true);
      return false;
    }
  }
  async updateMemberList(e) {
    try {
      const state = await xmz.xmz(e);
      if (state[0]) {
        e.reply(`❌ ${state[1]}`,true);
        return true;
      }
      const dp = `${xmz_.path}/data`;
      const fp = `${fp}/memberList.json`;
      await xmz.tools.mkdir(dp);
      try {} catch (err) {}
      /**
       * 先读取全部黑白名单json.b/w.global
       * 再读取功能黑白名单json.b/w.function
       * 进行创建写入处理，暂时先不写
       */
    } catch(err) {}
  }
}