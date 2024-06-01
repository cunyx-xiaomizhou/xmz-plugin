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
    let state = await xmz_.config(func,'state');
    if (!state) {
      if (await xmz_.config(func,'reply')) {
        e.reply('此功能已被关闭，请联系机器人主人开启',true);
      }
      return true;
    }
    let page = e.msg.replace(/(赞助|投喂)(名单|列表)|#/gi,'');
    if (page=='') {
      page = 1;
    }
    let afdian_key = await xmz_.config(func,'afdian_key');
    let afdian_uid = await xmz_.config(func,'afdian_uid');
    let be_paid_name = await xmz_.config(func,'be_paid_name');
    let be_paid_qq = await xmz_.config(func,'be_paid_qq');
    if (be_paid_name=='') {
      be_paid_name = Bot.nickname;
    }
    if (be_paid_qq=='') {
      be_paid_qq = Bot.uin;
    }
    if (afdian_key==''||afdian_uid=='') {
      e.reply('信息缺失，无法查询。请在小米粥插件下修改配置文件：\n'+xmz_.path+'/config/config');
      return true;
    }
    try {
      let apiReturn = await xmz.pay_list.getApi(page);
      if (!apiReturn||apiReturn[0]!=='{') {
        e.reply('API请求时出现错误');
      } else {
        let apiJson = JSON.parse(apiReturn);
        if (apiJson.ec !== 200) {
          e.reply('API请求失败：\n'+apiJson.em);
          return true;
        } else {
          let apiArray = xmz.pay_list.handle(apiReturn);
          e.reply(JSON.stringify(apiArray));
        }
      }
    } catch (err) {
      e.reply('API请求时出现错误：\n'+err,true);
    }
  }
}