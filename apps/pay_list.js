import xmz from '#xmz';
import xmz_ from '#xmz_';
import plugin from './../../../lib/plugins/plugin.js';
const func = 'pay_list';
export class xmz_plugin_pay_list extends plugin {
  constructor () {
    super({
      name:"赞助列表",
      dsc:"获取爱发电的赞助名单",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {
          reg:"^#?(赞助|投喂)(名单|列表)",
          fnc:"list"
        }
      ]
    });
  }
  async list(e) {
    let afdian_key = xmz_.config(func,'afdian_key');
    let afdian_uid = xmz_.config(func,'afdian_uid');
    let be_paid_name = xmz_.config(func,'be_paid_name');
    let be_paid_qq = xmz_.config(func,'be_paid_qq');
    if (be_paid_name=='') {
      be_paid_name = Bot.nickname;
    }
    if (be_paid_qq=='') {
      be_paid_qq = Bot.uin;
    }
  }
}