import fs from 'fs/promises';
// import xmz from '#xmz';
import xmz_ from '#xmz_';

import plugin from './../../../lib/plugins/plugin.js';
export class porridgeCoin_xmz_plugin extends plugin {
  constructor () {
    super({
      name:"我的米粥币",
      dsc:"查看我的米粥币",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?(查看)?(我的)?(米|粥)粥币",fnc:"cs"}
      ]
    });
  }
  async cs (e) {
    let qq = e.msg.replace(/(查看)?(我的)?(米|粥)粥币|#/g, '').trim();
    if (qq=='') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
      if (qq=='') {
        qq=e.user_id;
      }
    }
    const coinFile = `${xmz_.path}/data/coin.json`;
    let json;
    try {
      json = JSON.parse(await fs.readFile(coinFile));
    } catch (err) {
      e.reply('❌ 还没有任何人拥有米粥币！',true);
      return true;
    }
    let member = {}; 
    if (e.group_id) {
      member.group = (e.group_id in json&&qq in json[e.group_id]) ? json[e.group_id][qq] + '枚' : '未拥有';
    } else {
      member.group = false;
    }
    member.mine = (member in json&&qq in json.member) ? json.member[qq] + '枚' : '未拥有';
    let msg;
    if (member.group) {
      const Member = e.group.pickMember(Number(qq) || qq);
      const name = Member.card || Member.nickname;
      msg = [
        segment.at(e.user_id),
        `\n\n你查询的用户【${name}(${qq})】米粥币信息如下：`,
        `\n本群米粥币：${member.group}`,
        `\n私有米粥币：${member.mine}`,
        `\n🐷：想要查看其他群聊请在相应群聊查看`,
        segment.image(`https://q1.qlogo.cn/g?b=qq&s=100&nk=${qq}`)
      ];
    } else {
      msg = [
        `\n\n你查询的用户【${qq}】米粥币信息如下：`,
        `\n私有米粥币：${member.mine}`,
        `\n🐷：想要查看其他群聊请在相应群聊查看`,
        segment.image(`https://q1.qlogo.cn/g?b=qq&s=100&nk=${qq}`)
      ];
    }
    e.reply(msg,true);
    return true;
  }
}