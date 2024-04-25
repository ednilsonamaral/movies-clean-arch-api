import dotenv from 'dotenv';
import { Settings } from 'luxon';

import { IConstants } from '@core/models/constants';

import { Environments } from '@shared/enumerators';
import { logError, logInit } from '@shared/logging/console';
import ConstantsSchema from '@shared/validations/constants';

type ConstantsSchemaType = typeof ConstantsSchema._output;

dotenv.config();

const parse = (): ConstantsSchemaType => {
  let constants: ConstantsSchemaType = null;

  try {
    constants = ConstantsSchema.parse(process.env);
  } catch (error) {
    logError('⛔ Error when in parse constants');
    throw new Error(error.message);
  }

  return constants;
};

const Constants: IConstants = {} as IConstants;

const setConstants = () => {
  const config = parse();

  Constants.env = config.NODE_ENV as Environments;
  Constants.debug = config.DEBUG === 'true';
  Constants.timezone = config.TIMEZONE;
  Constants.appName = config.APP_NAME;
  Constants.port = Number(config.PORT);

  Constants.database = {
    hostWrite: config.DATABASE_HOST,
    name: config.DATABASE_NAME,
    port: Number(config.DATABASE_PORT),
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    pool: {
      acquire: Number(config.DATABASE_ACQUIRE),
      idle: Number(config.DATABASE_IDLE),
      max: Number(config.DATABASE_POOL_MAX),
      min: Number(config.DATABASE_POOL_MIN),
    },
  };

  Constants.tmdb = {
    baseUrl: config.TMBD_API_BASE_URL,
    token: config.TMBD_API_TOKEN,
  }

};

const setLuxon = () => {
  Settings.defaultLocale = 'pt-BR';
  Settings.defaultZone = Constants.timezone;
};

export const getEnv = (): IConstants => {
  if (!Object.keys(Constants).length) {
    setConstants();
  }

  return Constants;
};

export const initializeConstants = () => {
  setConstants();
  setLuxon();
  logInit('✅ Env started!');
};
