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
    e.reply([segment.at(e.user_id),` \n请稍等哦，${name}正在生成照片并发送`],true);
    const dir_path = `${xmz_.path}/data/${path}`;
    const save_path = `${dir_path}/${e.user_id}.png`;
    await xmz.tools.mkdir(dir_path);
    await xmz.puppeteer.url.save(url,save_path);
    await xmz.tools.sleep(2000);
    await e.reply(segment.image(save_path),true);
    return true;
  }
}