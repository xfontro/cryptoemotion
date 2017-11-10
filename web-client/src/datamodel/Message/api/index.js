import { fetchAPIData, getFetchHeader } from 'helpers/FetchData';
import { EMOTIONS_API_URL } from 'staticdata';

const header = {
  method: 'GET',
  mode: 'cors',
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
  },
};

const getMessage = () => {
  return fetchAPIData(
    `${EMOTIONS_API_URL}/api/last_message`,
    header
  ).then(res => res);
};

export {
  getMessage,
};
