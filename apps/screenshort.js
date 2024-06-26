import xmz from '#xmz';
import xmz_ from '#xmz_';
import plugin from './../../../lib/plugins/plugin.js';
export class webScreenShort_xmz extends plugin {
  constructor () {
    super({
      name:"网页截图",
      dsc:"截图网页并预览",
      event:"message",
      priority: 200,/*优先级*/
      rule:[
        {
          reg:"^#?(网页(截图|预览)|http(s)?://)",
          fnc:"screenshort"
        }
      ]
    });
  }
  async screenshort(e) {
    let url = e.msg.replace(/网页(截图|预览)|#/gi,'');
    let path = typeof e.group_id === 'number' ? e.group_id : 'friend';
    let name = await xmz_.config('bot','name');
    if (name=='') {
      name = Bot.nickname;
    }
    let reply = await xmz.tools.randomArray(await xmz_.config('bot','reply'));
    reply = reply.replace(/{{bot_name}}/gi,name);
    e.reply([segment.at(e.user_id),` \n${reply}`],true);
    const dir_path = `${xmz_.path}/data/screenshort/${path}`;
    const save_path = `${dir_path}/${e.user_id}.png`;
    try {
      let bufferData = await xmz.puppeteer.url.buffer(url);
      await e.reply(segment.image(bufferData),true);
      return true;
    } catch (err) {
      e.reply('截图出现错误：\n' +err,true);
    }
  }
}