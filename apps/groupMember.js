import xmz from '#xmz';
import plugin from './../../../lib/plugins/plugin.js';

export class getNowGroupMember extends plugin {
  constructor () {
    super({
      name:"刷新群聊",
      dsc:"强制刷新群聊成员状态",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {
            reg:"^#?刷新本群(聊)?",
            fnc:"getMember"
        }
      ]
    });
  }
  async getMember(e) {
    try {
      const state = await xmz.xmz(e);
      if (!state[0]) {
        e.reply('❌ '+state[1]);
        return true;
      }
      await Bot.pickGroup(e.group_id).getMemberMap(true);
      e.reply(`✅ 群聊${e.group_id}成员数据刷新完成`,true);
    } catch (err) {
      e.reply('❌ 运行时出现错误：\n'+err);
      return true;
    }
  }
}