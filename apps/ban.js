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
    e.reply('正则触发成功！');
  }
}