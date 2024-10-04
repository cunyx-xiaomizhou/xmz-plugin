import fs from 'fs/promises';
import xmz from '#xmz';
import xmz_ from '#xmz_';
import plugin from './../../../lib/plugins/plugin.js';

const coinFile = `${xmz_.path}/data/coin.json`;

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
    if (!e.group_id) {
      e.reply('❌ 本功能仅能在群聊使用',true);
      return false;
    }
    if (!(e.group.is_admin || e.group.is_owner)) {
      e.reply('❌ 机器人非管理员/群主，无法使用此功能');
      return true;
    }
    let qq;
    qq = e.msg.replace(/口球|#/gi, '').trim();
    if (qq=='') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
    }
    if (qq=='') {
      qq = e.user_id;
      await xmz.tools.sleep(2000);
    }
    e.reply(`✅ 被操作者QQ号：${qq}`,true);
    let json;
    try {
      json = JSON.parse(await fs.readFile(coinFile));
    } catch (err) {
      e.reply('❌ 还没有任何人拥有米粥币！',true);
      return true;
    }
    let member = {}; 
    if (e.group_id) {
      member.group = (e.group_id in json&&e.user_id in json[e.group_id]) ? json[e.group_id][e.user_id] + '枚' : '未拥有';
    } else {
      member.group = false;
    }
    member.mine = (member in json&&e.user_id in json.member) ? json.member[e.user_id] + '枚' : '未拥有';
    e.reply(`✅ 操作用户本群米粥币：${member.group}\n私有米粥币：${member.mine}`,true);
    return true;
  }
}