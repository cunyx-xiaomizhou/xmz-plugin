import xmz_ from '#xmz_';
import axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';

async function api(page = 1) { 
  try {
    const func = 'pay_list';
    const api_key = await xmz_.config(func, 'afdian_key');
    const api_user_id = await xmz_.config(func, 'afdian_uid');
    const api_url = 'https://afdian.net/api/open/query-sponsor';
    const time = Math.floor(Date.now() / 1000);
    const params = { page: page };
    const signData = `${api_key}params${JSON.stringify(params)}ts${time}user_id${api_user_id}`;
    const sign = crypto.createHash('md5').update(signData, 'utf8').digest('hex');
    const data = {
      user_id: api_user_id,
      ts: time,
      sign: sign
    }
    const fullUrl = `${api_url}?${querystring.stringify({ params: JSON.stringify(params) })}&${querystring.stringify(data)}`;
    const response = await axios.get(fullUrl);
    return JSON.stringify(response.data);
  } catch (error) {
    return error;
  }
}

export { api };