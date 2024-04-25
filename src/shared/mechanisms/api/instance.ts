import axios, { AxiosInstance } from 'axios';

import { getEnv } from '@core/constants';

const getInstance: AxiosInstance = axios.create({
  baseURL: `${getEnv().tmdb.baseUrl}/3/trending/movie/day?language=en-US`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${getEnv().tmdb.token}`,
  },
});

export default getInstance;