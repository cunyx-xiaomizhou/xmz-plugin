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
    const dataPath = `${xmz_.path}/data/${func}`;
    await xmz.tools.mkdir(dataPath);
  }
}