import plugin from './../../../lib/plugins/plugin.js';

export class xmz_ban extends plugin {
  constructor () {
    super({
      name:"口球禁言",
      dsc:"使用米粥币禁言群员",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {
            reg:"^#?口球(.*)?",
            fnc:"ban",
        }
      ]
    });
  }
  async ban(e) {
    if (e.group_id) {
      e.reply('❌ 本功能仅能在群聊使用',true);
      return false;
    }
    if (!(e.group.is_admin || e.group.is_owner)) {
      e.reply('❌ 机器人非管理员/群主，无法使用此功能');
      return true;
    }
    let qq;
    qq = e.msg.replace(/禁言大转盘|#/gi, '').trim();
    if (qq=='') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
    }
    if (qq=='') {
      qq = e.user_id;
      await xmz.tools.sleep(2000);
    }
    e.reply(`✅ 被操作者QQ号：${qq}`,true);
  }
}