import { Response } from 'express';
import httpStatus from 'http-status';

import { getEnv } from '@core/constants';
import { ICustomRequest } from '@core/models/custom-request';

import {
  BusinessError,
} from '@shared/errors';

export function handleError (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: ICustomRequest,
  res: Response
) {
  if (err instanceof BusinessError && err.isBusinessError) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.code,
      options: err.options,
    });

    return;
  }

  if (getEnv().env !== 'production') {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      ...err,
      stack: err.stack,
      message: err.message,
    });

    return;
  }

  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}