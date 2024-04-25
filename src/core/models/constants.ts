import { Environments } from '@shared/enumerators';

export interface IConstants {
  env: Environments;
  debug: boolean;
  appName: string;
  timezone: string;
  locale: string;
  port: number;

  database: {
    hostWrite: string;
    port: number;
    name: string;
    user: string;
    password: string;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  };

  tmdb: {
    baseUrl: string;
    token: string;
  }
}

export interface IEnvironmentSecrets {
  NODE_ENV: string;
  APP_NAME: string;
  DEBUG: string;
  TIMEZONE: string;
  locale: string;
  PORT: string;

  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_POOL_MAX: string;
  DATABASE_POOL_MIN: string;
  DATABASE_ACQUIRE: string;
  DATABASE_IDLE: string;

  TMBD_API_BASE_URL: string;
  TMBD_API_TOKEN: string;
}
