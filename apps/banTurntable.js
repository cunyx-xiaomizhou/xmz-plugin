import fs from 'fs/promises';
import xmz from '#xmz';
import xmz_ from '#xmz_';
import plugin from './../../../lib/plugins/plugin.js';

const func = 'banTurntable';
const dataPath = `${xmz_.path}/data/${func}`;
const coinFile = `${xmz_.path}/data/coin.json`;

export class banTurntable_xmz_plugin extends plugin {
  constructor () {
    super({
      name:"禁言大转盘",
      dsc:"我就喜欢被禁言的感觉",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {
          reg:"^#?(开启|关闭)禁言大转盘$",
          fnc:"switches"
        },
        {
            reg: "^#禁言大转盘(.*)?",
            fnc: "bt"
        },
        {
            reg: /^#?清除cd(.*)?/gi,
            fnc: "clear"
        }
      ]
    });
  }
  async switches(e) {
    if (!e.group_id) {
      e.reply('❌ 此功能仅能在群聊里使用',true);
      return false;
    }
    let state = await xmz.xmz(e);
    if (!(state[0] || (e.member.is_admin || e.member.is_owner))) {
      e.reply('❌ 你没有权限执行此操作，'+state[1],true);
      return false;
    }
    let switches = e.msg.replace(/禁言大转盘|#/gi,'');
    let condition = switches.includes('开启') ? true : false;
    const filePath = `${dataPath}/${e.group_id}.json`;
    await xmz.tools.mkdir(dataPath);
    let Data;
    try {
      Data = JSON.parse(await fs.readFile(filePath));
    } catch (err) {
      Data = {
        state: condition,
        cd: {
          group: Date.now(),
          member: {}
        }
      };
    }
    await fs.writeFile(filePath, await xmz.tools.sent(Data));
    e.reply('✅ 本群禁言大转盘状态已更新');
  }
  async bt(e) {
    if (!e.group_id) {
      e.reply('❌ 此功能仅能在群聊里使用',true);
      return false;
    }
    let qq;
    if (e.member.is_admin || e.member.is_owner) {
      qq = e.msg.replace(/禁言大转盘|#/gi, '').trim();
      if (qq=='') {
        qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
      }
      if (qq=='') {
        qq = e.user_id;
        e.reply('❌ 您是本群的头头，我不敢禁言你，我还是开个玩笑吧.....',true);
        await xmz.tools.sleep(2000);
      }
    } else {
      qq = e.user_id;
    }
    if (!(e.group.is_admin || e.group.is_owner)) {
      e.reply('❌ 机器人非管理员/群主，无法使用此功能');
      return true;
    }
    await xmz.tools.mkdir(dataPath);
    const filePath = `${dataPath}/${e.group_id}.json`;
    let Data;
    try {
      Data = JSON.parse(await fs.readFile(filePath));
    } catch (err) {
      e.reply('❌ 本群还没有数据文件，请先#开启禁言大转盘',true);
      return true;
    }
    if (!Data.state) {
      e.reply('❌ 功能暂未开启，请先#开启禁言大转盘',true);
      return true;
    }
    let ti;
    if (Data.cd.group > Date.now()) {
      ti = (Data.cd.group - Date.now()) / 1000;
      e.reply('❌ 本群禁言大转盘正在冷却中，冷却还有' + ti + '秒',true);
      return true;
    }
    if (Data.cd.member[e.user_id] > Date.now()) {
      ti = (Data.cd.member[e.user_id] - Date.now()) / 1000;
      e.reply('❌ 您的禁言大转盘正在冷却，请' + ti + '秒后再试.....',true);
      return true;
    }
    const min = await xmz_.config(func,'min',e.group_id);
    const max = await xmz_.config(func,'max',e.group_id);
    const cd = {
      p: await xmz_.config(func,'cd-person',e.group_id),
      g: await xmz_.config(func,'cd-group',e.group_id)
    };
    const t = await xmz.tools.random(min, max);
    await e.group.muteMember(qq, t);
    Data.cd.member[e.user_id] = Date.now() + cd.p * 1000;
    Data.cd.group = Date.now() + cd.g * 1000;
    await fs.writeFile(filePath, await xmz.tools.sent(Data));
    let coinb;
    try {
      coinb = await xmz.config(func,'coin',e.group_id);
    } catch (err) {
      await xmz.tools.uc(func, 'coin')
      coinb = await xmz.config(func,'coin',e.group_id);
    }
    let mod = t % 60;
    let m = ((t - mod) / 60 ) + 1;
    let jsonCoin;
    try {
      jsonCoin = JSON.parse(await fs.readFile(coinFile));
      jsonCoin[qq] += m * coinb;   
    } catch (err) {
      jsonCoin = {
        [qq]: m * coinb,
      }
    }
    await fs.writeFile(coinFile, await xmz.tools.sent(jsonCoin));
    e.reply('✅ 随机完成，已把你禁言'+t+'秒，并获得'+m+'枚米粥币',true);
  }
  async clear(e) {
    if (!e.group_id) {
      e.reply('❌ 此功能仅能在群聊里使用',true);
      return true;
    }
    const state = await xmz.xmz(e);
    if (!(state[0] || (e.member.is_admin || e.member.is_owner))) {
      e.reply('❌ 你没有权限执行此操作，'+state[1],true);
      return true;
    }
    await xmz.tools.mkdir(dataPath);
    const filePath = `${dataPath}/${e.group_id}.json`;
    let Data;
    try {
      Data = JSON.parse(await fs.readFile(filePath));
    } catch (err) {
      e.reply('❌ 本群还没有数据文件，请先#开启禁言大转盘',true);
      return true;
    }
    let qq;
    qq = e.msg.replace(/清除cd|#/gi, '').trim();
    if (qq=='') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
    }
    if (qq=='') {
      qq = e.user_id;
    }
    Data.cd.member[qq] = Date.now();
    Data.cd.group = Date.now();
    await fs.writeFile(filePath, await xmz.tools.sent(Data));
    e.reply('✅ 本群cd和用户'+qq+'的cd已成功清除！',true);
  }
}