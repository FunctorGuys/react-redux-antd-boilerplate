import axios from 'axios';
import { API_URL } from 'config';
import { _store } from 'index';
import { getLoggedInfo } from 'reducers/auth/select';

const axiosInstance = axios.create({
  baseURL: API_URL || 'http://localhost:3001/api/v1',
});

const request = (options = {}) => {
  const token = getLoggedInfo(_store.getState()).token;

  axiosInstance.defaults.headers['Authorization'] = `Token ${token}`;

  if (options.headers) {
    axiosInstance.defaults.headers = Object.assign(
      {},
      axiosInstance.defaults.headers,
      options.headers
    );
  }

  return axiosInstance;
};

export default request;

export const parseErrorResponse = (err) =>
  err && err.response ? err.response.data : new Error('Bad request');

export const parseSuccessResponse = (res) => {
  const { data } = res.data;
  if (data) return Promise.resolve(data);
  else {
    return Promise.reject(new Error('Something went wrong!'));
  }
};
