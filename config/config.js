import fs from 'fs';
async function config(fileName, key) {
  const config_path = process.cwd() + '/plugins/xmz-plugin/config/config/';
  let filePath = config_path + fileName + '.json';
  let content = await fs.readFileSync(filePath);
  let Json = await JSON.parse(content);
  return Json.config[key];
}
export { config };