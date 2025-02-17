import xmz from '#xmz';
import xmz_ from '#xmz_';
const meme_api = 'https://tools.xmz.netkj.com/api/API/memes/'; 
export class xmz_plugin_memes extends plugin {
  constructor () {
    super({
      name:"表情包生成",
      dsc:"小米粥工具箱独家表情包内容",
      event:"message",
      priority:10086,
      rule:[
        {
          reg:/#?(wz|王者)(ry|荣耀)?(1|5)v((1|2)?5)(.*)?/gi,
          fnc:'王者荣耀'
        }
      ]
    });
  }
  async 王者荣耀(e) {
    const uid = await xmz_.config('xmzTools', 'uid');
    const api_key = await xmz_.config('xmzTools', 'api_key');
    if (!uid||!api_key||uid==''||api_key=='') {
      e.reply('❌ 生成失败，还未设置小米粥工具箱UID和API_key')
    }
    let json;
    let uin = (e.at==undefined) ? e.user_id : e.at;
    let typ = e.msg.replace(/#|wz|ry|王者|荣耀/gi, '';
    typ = (typ==null||typ=='') ? '5v5' : typ;
    try {
      e.reply(`开始生成王者荣耀${typ}，这可能需要一些时间.....`,true);
      json = await (await fetch(`${meme_api}5v5?uid=${uid}&api_key=${api_key}&uin=${uin}&typ=${typ}`)).json();
      if (json.code == 200) {
        e.reply(segment.image('base64://'+json.data.base64));
      } else {
        e.reply(`❌${json.msg}`,true);
      }
    } catch (err) {
      e.reply(`❌ 出了点小问题：\n\n${err}`,true);
    }
    return false;
  }
}