import axios from 'axios';

export const fetchPost = (url, parames) => (
  axios.post(url, parames, {
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
);

export const fetchDel = (url, parames) => (
  axios.delete(url, {
    data: parames,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
);

export const fetchPatch = (url, parames) => (
  axios.patch(url, parames, {
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
);

export const fetchGet = (url, parames) => {
  const fetch = axios.create({
    method: 'get',
    timeout: 5000,
  });

  return fetch(url, parames);
};
