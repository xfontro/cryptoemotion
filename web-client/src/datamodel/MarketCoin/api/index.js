import { fetchAPIData, getFetchHeader } from 'helpers/FetchData';
import { COINMARKET_API_URL, EMOTIONS_API_URL } from 'staticdata';

const header = {
  method: 'GET',
  mode: 'cors',
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
  },
};

const getCoins = () => {
  return fetchAPIData(
    `${COINMARKET_API_URL}?limit=430`,
    header
  ).then(res => res);
};

const getEmotions = () => {
  return fetchAPIData(
    `${EMOTIONS_API_URL}/api/list`,
    header
  ).then(res => res);
};

export {
  getCoins,
  getEmotions,
};
