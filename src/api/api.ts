import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'https://nutriback-seven.vercel.app',
});

api.interceptors.request.use(
  async function (config) {
    try {
      const session = await SecureStore.getItemAsync('session');
      if (session !== undefined && session !== null) {
        config.headers.Authorization = `Bearer ${session}`;
      }
    } catch (err) {
      console.log(err.code);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;
