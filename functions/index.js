import fs from 'fs';
import tools from './tools.js';
import { loading } from './loading.js';
import { Copyright } from './Copyright.js';
import pay_list from './pay_list/index.js'; 
import puppeteer from './puppeteer/index.js';
let xmz = {
    loading: loading,
    puppeteer: puppeteer,
    pay_list: pay_list,
    tools: tools,
    Copyright: Copyright
};
export default xmz;