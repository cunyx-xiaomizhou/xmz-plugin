import fs from 'fs/promises';
import xmz from '#xmz';
import xmz_ from '#xmz_';
import plugin from './../../../lib/plugins/plugin.js';

const func = 'ban';
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
    ban_time = +ban_time;
    if (Number.isNaN(ban_time)) {
      e.reply('❌ 禁言时长暂不支持非数字格式\n错误的禁言时间：'+ban_time,true);
      return true;
    }
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
    /**
     * 这里留着以后适配中文单位
     * @ban_time 禁言时长 单位秒
     * 后续操作以此变量为准
     */
    if (ban_time < 60) {
      ban_time = Math.floor(ban_time * 60);
    }
    let raito_ban = await xmz_.config(func, 'raito_ban', e.group_id);
    if (Bot.pickGroup(e.group_id,true).pickMember(qq,true).is_admin || Bot.pickGroup(e.group_id,true).pickMember(qq).is_owner) {
      if (e.member.is_admin || e.member.is_owner) {
        e.reply('❌ 管理之间至于这么狠嘛😳....',true);
        return true;
      }
      e.reply('❌ 你....你干嘛.....(害怕)\n不可以给管理员和群主戴口球的啊！',true);
      qq = e.user_id;
    }
    let coin = Math.floor(ban_time/60) * Math.floor(ratio_ban);
    if (member.group < coin) {
      e.reply(`❌ 收买TA需要${coin}枚米粥币，而你只有${member.group}枚米粥币\n去赚取或者兑换一些再来吧！`,true);
      return true;
    } else {
      let newCoin = member.group - coin;
      json[e.group_id][e.user_id] = newCoin;
      await fs.writeFile(coinFile, await xmz.tools.sent(json));
      await e.group.muteMember(qq, ban_time);
      e.reply(`✅ 恭喜你使用${coin}米粥币成功收买TA，TA将“自愿*佩戴口球${ban_time}秒！`,true);
    }
    return true;
  }
}