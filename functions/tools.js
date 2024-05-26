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
async function randomArray(array) {
    let length = array.length;
    let randomIndex = random(0,length - 1);
    let randomElement = array[randomIndex];
    return randomElement;
}
let tools = {
    sent: sent,
    sleep: sleep,
    mkdir: mkdir,
    randomArray: randomArray
};
export default tools;