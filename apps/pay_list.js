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
      page = '1';
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
          let apiArray = await xmz.pay_list.handle(apiReturn);
          let money_config = await xmz_.config(func,'money');
          let html_body = await xmz.tools.getRes(func,'body.html');
          let html_work = await xmz.tools.getRes(func,'user.html');
          let work_html;
          for (let apiIndex = 0;apiIndex < apiArray.length; apiIndex++) {
            // 循环遍历处理后的数组，组成用户列表html
            let ApiData = apiArray[apiIndex];
            let name = ApiData.name;
            let avatar = ApiData.avatar;
            let money = ApiData.money;
            let nickname;
            if (money_config!=false) {
              nickname = name + `（${money}元）`;
            } else {
              nickname = name;
            }
            let now_html = html_work
              .replace(/{{userName}}/gi,nickname)
              .replace(/{{avatar_url}}/gi,avatar);
            work_html = work_html + now_html;
          }
          let body_html = html_body
            .replace(/{{be_paid_qq}}/gi,be_paid_qq)
            .replace(/{{be_paid_name}}/gi,be_paid_name)
            .replace(/{{now_page}}/gi,page)
            .replace(/{{all_page}}/gi,apiJson.data.total_page)
            .replace(/{{back-color}}/gi,await xmz_.config(func,'back-color'))
            .replace(/{{divFont_url}}/gi,await xmz_.config(func,'divFont'))
            .replace(/{{background-image_url}}/gi,await xmz_.config(func,'back-img'))
            .replace(/{{list_body}}/gi,work_html);
          let bufferData = await xmz.puppeteer.content.buffer(body_html,save_path);
          e.reply(sengment.image(bufferData));
        }
      }
    } catch (err) {
      e.reply('列表生成中出现错误：\n'+err,true);
    }
  }
}