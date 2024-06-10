import xmz from '#xmz';
import xmz_ from '#xmz_';
import plugin from './../../../lib/plugins/plugin.js';

const func = 'banTurntable';

export class banTurntable_xmz_plugin extends plugin {
  constructor () {
    super({
      name:"禁言大转盘",
      dsc:"我就喜欢被禁言的感觉",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {
          reg:"^#?禁言大转盘",
          fnc:"play"
        }
      ]
    });
  }
  async switches(e) {
    const groupArray = await xmz_.config(func,'group');
    let state = false;
    for (let index = 0; groupArray.length() <= index; index++) {
      if (groupArray[index] == e.group_id) state = true;
    }
    if (state) {
      //开启的处理方法
    } else {
      e.reply(`此功能未开启，请联系机器人主人在${xmz_.path}/config/config/${func}.json中开启`,true);
    }
  }
}