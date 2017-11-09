import fetch from 'isomorphic-fetch';

const badiContextHeaders = [
  { property: 'Badi-Platform', value: 'web' },
  { property: 'Badi-App-Version', value: 'Coding challenge 1.0.0' },
  { property: 'Badi-Screen-Size', value: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : null },
  { property: 'Badi-Inner-Window-Size', value: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : null },
  { property: 'Badi-Os-Version', value: null },
  { property: 'Badi-Language', value: 'en' },
  { property: 'Badi-Favourite-Language', value: 'en' },
];

const fetchBadiContextHeaders = () => {
  const validProperties = badiContextHeaders.filter(header => header.value !== null);
  return validProperties.reduce((memo, item) => {
    memo[item.property] = item.value;
    return memo;
  }, {});
};

const getFetchHeader = (method, params, token) => {
  const requiredHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const header = {
    method: method || 'GET',
    headers: Object.assign(requiredHeaders, fetchBadiContextHeaders())
  };
  if (header.method === 'POST' || header.method === 'PUT') header.body = params ? JSON.stringify(params) : '';
  if (token) header.headers.Authorization = token;

  return header;
};

const fetchAPIData = (url, header, returnParam) => {
  return fetch(url, header)
    .then((response) => {
      if (response.ok) {
        if (response.status === 204) {
          return new Promise((resolve) => { resolve({ succeed: true, ...returnParam }); });
        }
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err);
      });
    });
};

export { fetchAPIData, getFetchHeader };
