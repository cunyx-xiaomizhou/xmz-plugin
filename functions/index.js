import fs from 'fs';
import tools from './tools.js';
import { loading } from './loading.js';
import puppeteer from './puppeteer/index.js';
let xmz = {
    loading: loading,
    puppeteer: puppeteer,
    tools: tools
};
export default xmz;