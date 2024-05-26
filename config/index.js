import fs from 'fs';
import { config } from './config.js';
const plugin_name = {
    en: 'xmz-plugin',
    cn: '小米粥插件'
};
const plugin_path = process.cwd()+'/plugins/'+plugin_name.en;
let packageJson = JSON.parse(fs.readFileSync(`${plugin_path}/package.json`, 'utf8'));
const plugin_version = packageJson.version;
let xmz_ = {
    name: plugin_name,
    path: plugin_path,
    version: plugin_version,
    config: config
};
export default xmz_;