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
  const df = `${xmz_.path}/config/default/${fileName},json`;
  const udf = `https://gitee.com/cunyx/xmz-plugin/raw/master/config/default/${fileName},json`;
  let json;
  let tip;
  let v;
  if (Value=='') {
    try {
      json = JSON.parse(await fs.readFile(df));
      Value = json.config[key];
      tip = json.tip;
      v = json.version;
    } catch (err) {
      try {
        json = await fetch(udf).json();
        tip = json.tip;
        Value = json.config[key]; 
        v = json.version;
      } catch (e) {
        return [false,err+'\n\n'+e];
      }
    }
  }
  const c = `${xmz_.path}/config/config/${fileName}.json`;
  json = await fs.readFile(c);
  json.tip = tip;
  json.version = v;
  if (group='') {
    json.config[key] = Value;
  } else {
    json.config[group][key] = Value;
  }
  await fs.writeFile(c,await sent(json));
  return [true];
}
let tools = {
  random: random,
  sent: sent,
  sleep: sleep,
  mkdir: mkdir,
  getRes: getRes,
  randomArray: randomArray,
  uc: uc
};

export default tools;