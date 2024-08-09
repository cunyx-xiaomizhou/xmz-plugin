import fs from 'fs';
async function config(fileName, key, Key='default') {
  const config_path = process.cwd() + '/plugins/xmz-plugin/config/config/';
  let filePath = config_path + fileName + '.json';
  let content = await fs.readFileSync(filePath);
  let Json = await JSON.parse(content);
  return (Key=='default') ? Json.config[key] : (Json.config[Key][key]) ? Json.config[Key][key] : Json.config[key];
}
export { config };