import xmz_ from '#xmz_';
import fs from 'fs/promises';

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function sent(Json) {
  if (typeof Json === 'string') {
    Json = JSON.parse(Json);
  }
  let json = JSON.stringify(Json, null, 2).replace(/\\\//g, '/');
  return json;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mkdir(dirPath) {
  try {
    await fs.access(dirPath);
    return false;
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });
      return true;
    }
  }
}

async function randomArray(array) {
  let length = array.length;
  let randomIndex = random(0, length - 1);
  let randomElement = array[randomIndex];
  return randomElement;
}

async function getRes(functions, resPath) {
  const data = await fs.readFile(xmz_.path + '/resource/' + functions + '/' + resPath, 'utf8');
  return data;
}

async function uc (fileName, key, Value='', group='') {
  const df = `${xmz_.path}/config/default/${fileName}.json`;
  const udf = `https://gitee.com/cunyx/xmz-plugin/raw/master/config/default/${fileName}.json`;
  let json;
  let tip;
  let v;

  try {
    if (Value === '') {
      try {
        json = JSON.parse(await fs.readFile(df));
        Value = json.config[key];
        tip = json.tip;
        v = json.version;
      } catch (err) {
        json = await fetch(udf).then(response => response.json());
        tip = json.tip;
        Value = json.config[key];
        v = json.version;
      }
    }

    const c = `${xmz_.path}/config/config/${fileName}.json`;
    json = JSON.parse(await fs.readFile(c));
    json.tip = (tip=='') ? json.tip : tip;
    json.version = (v=='') ? json.version : v;

    if (group === '') {
      json.config[key] = Value;
    } else {
      if (!(group in json.config)) {
        json.config[group] = {};
      }
      json.config[group][key] = Value;
    }

    await fs.writeFile(c, await sent(json));
    return [true, await sent(json)];
  } catch (err) {
    return [false, err.toString()];
  }
}
async function sendMsg(e, msg) {
  let data_msg = [];
  for (let i = 0; i < msg.length; i++) {
    if (msg[i].startsWith('http') || msg[i].startsWith('data:image')) {
      data_msg.push({
        message: segment.image(msg[i]),
        nickname: Bot.nickname,
        user_id: Bot.uin,
      });
      continue;
    }
    data_msg.push({
      message: msg[i],
      nickname: Bot.nickname,
      user_id: Bot.uin,
    });
  }
  let send_res = null;
  if (e.isGroup)
    send_res = await e.reply(await e.group.makeForwardMsg(data_msg));
  else send_res = await e.reply(await e.friend.makeForwardMsg(data_msg));
  if (!send_res) {
    e.reply("消息发送失败，可能被风控~");
  }
  return true;
}
function exu(text) {
  const urlRegex = /https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*/g;
  const urls = text.match(urlRegex);
  return urls || [];
}

let tools = {
  random: random,
  sent: sent,
  sleep: sleep,
  mkdir: mkdir,
  getRes: getRes,
  randomArray: randomArray,
  uc: uc,
  sendMsg: sendMsg,
  exu: exu
};

export default tools;