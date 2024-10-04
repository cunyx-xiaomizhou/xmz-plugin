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
    let ban_time;
    let qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
    let para = e.msg.replace(/口球|#/gi,'').trim();
    let if_para = (para.includes(':')||para.includes('：')||para.includes(' '));
    e.reply(`✅ 处理前的原始信息：\n\nqq：${qq}\npara：${para}\n是否分割：${if_para?'是':'否'}`);
    if (qq!=''&&!if_para) {
      // @了成员，并没有使用分割参数
      if (para=='') {
        qq = qq;
        ban_time = 5;
      } else {
        qq = qq;
        ban_time = para;
      }
    } else if (qq==''&&if_para) {
      // 没有@成员，但使用了分割参数
      let para_array = para.split(/:|;|[ ]/);
      if (para_array.length!=2) {
        e.reply('❌ 参数数量不正确，当前参数数量：'+para_array.length);
        return true;
      } else {
        qq = para_array[0];
        ban_time = para_array[1];
      }
    } else if (qq!=''&&if_para) {
      // @了成员并且使用了分割参数
      e.reply('❌ 请不要多次选择对象',true);
      return true;
    } else if (qq==''&&!if_para) {
      // 没有@成员也没有使用分割参数
      e.reply('❌ 请不要给自己戴口球！',true);
      return true;
    } else {
      // 其他情况
      e.reply(`❌ 你让作者很难办哦，请截图以下信息反馈：\n\ne.msg：${e.msg}\nqq：${qq}\npara：${para}`);
    }
    e.reply(`✅ 信息读取完成\n\n【config】：\n被操作人：${qq}\n被禁言时长:${ban_time}`);
    let json;
    try {
      json = JSON.parse(await fs.readFile(coinFile));
    } catch (err) {
      e.reply('❌ 还没有任何人拥有米粥币！',true);
      return true;
    }
    let member = {}; 
    if (e.group_id) {
      member.group = (e.group_id in json&&e.user_id in json[e.group_id]) ? json[e.group_id][e.user_id] : false;
    } else {
      member.group = false;
    }
    if (!member.group) {
      e.reply('❌ 你在本群还未拥有米粥币，无法使用本功能',true);
      return true;
    }
    
    return true;
  }
}