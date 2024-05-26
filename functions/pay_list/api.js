import xmz_ from '#xmz_';
import axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';
async function api (page=1) { 
  const api_key = await xmz_.config('pay_list','afdian_key');
  const api_user_id = await xmz_.config('pay_list','afdian_uid');
  const api_url = 'https://afdian.net/api/open/query-sponsor';
  const time = Math.floor(Date.now() / 1000);
  const params = { page:page };
  const signData = `${api_key}params${JSON.stringify(params)}ts${time}user_id${api_user_id}`;
  const sign = crypto.createHash('md5').update(signData).digest('hex');
  const data = {
    user_id: api_user_id,
    ts: time,
    sign: sign
  };
  const fullUrl = `${api_url}?${querystring.stringify({ params: JSON.stringify(params) })}&${querystring.stringify(data)}`;
  axios.get(fullUrl)
    .then(response => {
      const apiReturn = response.data;
      return apiReturn;
    })
    .catch(error => {
      return error;
    });
}
export { api };