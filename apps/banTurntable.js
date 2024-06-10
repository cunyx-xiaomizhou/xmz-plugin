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
          reg:"^#?(开启|关闭)禁言大转盘",
          fnc:"switches"
        }
      ]
    });
  }
  async switches(e) {
    let state = await xmz_.comfig(func,'state');
    if (state) {
      const dataPath = `${xmz_.path}/data/${func}`;
      const filePath = `${dataPath}/${e.group_id}.json`;
      await xmz.tools.mkdir(dataPath)
    } else {
      e.reply(`此功能未开启，请联系机器人主人在${xmz_.path}/config/config/${func}.json中开启`,true);
    }
  }
}