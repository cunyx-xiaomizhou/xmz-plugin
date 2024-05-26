import fs from 'fs';
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
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  } else {
    return false;
  }
}
let tools = {
    sent: sent,
    sleep: sleep,
    mkdir: mkdir
};
export default tools;