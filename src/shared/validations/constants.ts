import * as z from 'zod';

const Schema = z.object({
  NODE_ENV: z.string(),
  APP_NAME: z.string().optional(),
  DEBUG: z.string().default('false'),
  TIMEZONE: z.string().default('America/Sao_Paulo'),
  locale: z.string().default('pt-br'),
  PORT: z.string().default('3025'),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().default('5432'),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_POOL_MAX: z.string().default('10'),
  DATABASE_POOL_MIN: z.string().default('1'),
  DATABASE_ACQUIRE: z.string().default('10000'),
  DATABASE_IDLE: z.string().default('20000'),

  TMBD_API_BASE_URL: z.string(),
  TMBD_API_TOKEN: z.string(),
});

export default Schema;
