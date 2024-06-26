import fs from 'node:fs';
import xmz from '#xmz';
import xmz_ from '#xmz_';
const defDir = xmz_.path + '/config/default';
const configDir = xmz_.path + '/config/config';
xmz.loading(configDir,defDir);
const files = fs.readdirSync('./plugins/'+xmz_.name.en+'/apps').filter(file => file.endsWith('.js'));
let ret = [];
files.forEach((file) => {
  ret.push(import(`./apps/${file}`));
});
ret = await Promise.allSettled(ret);
let apps = {};
for (let i in files) {
  let name = files[i].replace('.js', '');
  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`);
    logger.error(ret[i].reason);
    continue;
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]];
}
export { apps };