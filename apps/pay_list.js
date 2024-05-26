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
    let state = xmz_.config(func,'state');
    if (!state) {
      if (xmz_.config(func,'reply')) {
        e.reply('此功能已被关闭，请联系机器人主人开启',true);
      }
      return true;
    }
    let page = e.msg.replace(/(赞助|投喂)(名单|列表)|#/gi,'');
    if (page=='') {
      page = 1;
    }
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
    if (afdian_key==''||afdian_uid=='') {
      e.reply('信息缺失，无法查询。请在小米粥插件下修改配置文件：\n'+xmz_.path+'/config/config');
      return true;
    }
    try {
      let apiReturn = xmz.pay_list.getApi(page);
      if (!apiReturn||apiReturn[0]!=='{') {
        e.reply('API返回出现错误，请稍后再试');
      } else {
        e.reply('测试消息：API请求成功，但真实性有待确认');
      }
    } catch (err) {
      e.reply('API请求时出现错误：\n'+err,true);
    }
  }
}