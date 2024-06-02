import fs from 'fs';
import xmz_ from '#xmz_';
async function Copyright (div='') {
  let bot_path = process.cwd();
  let jsonString = fs.readFileSync(bot_path+'/package.json','utf8');
  const Json = JSON.parse(jsonString);
  let Bot_name = Json.name;
  if (Bot_name == 'miao-yunzai') {
    Bot_name = 'Miao-Yunzai';
  } else if (Bot_name == 'trss-yunzai') {
    Bot_name = 'TRSS-Yunzai';
  } else if (Bot_name == 'yunzai-bot') {
    Bot_name = 'Yunzai-Bot';
  }
  let bot_version = Json.version;
  let plugin_name = xmz_.name;
  let plugin_version = xmz_.version;
  let Copyright = `<b><white>Created By ${bot_name} <gold>V${bot_version}</gold> && ${plugin_name} <gold>${plugin_version}</gold></b>`;
  if (div!='') {
    Copyright = `${Copyright}<br/>${div}`;
  }
  return Copyright;
}