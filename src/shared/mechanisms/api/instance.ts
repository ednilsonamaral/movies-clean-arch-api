import axios, { AxiosInstance } from 'axios';

import { getEnv } from '@core/constants';

const getInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWM2ZjliZTNiMjc2ODgyNDZmNDU0NmY3ZmNmNzllYSIsInN1YiI6IjVhYTdjOGJlOTI1MTQxNWUzOTAxY2E4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gLrDOKHdgYO1AIWOMIU6DoziaNi3khUeXPtCMJk6l20'
  },
});

export default getInstance;