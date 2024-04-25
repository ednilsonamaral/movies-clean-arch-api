import { CustomError } from 'ts-custom-error';

import { Dictionary } from '@core/models/dictionary';

export class BusinessError extends CustomError {
  code: string;
  options: Dictionary<string | number | boolean>;
  isBusinessError = true;

  constructor (code: string, options?: Dictionary<string | number | boolean>) {
    super(code);
    this.code = code;
    this.options = {
      ...options,
      message: BusinessErrorCodes[code.toUpperCase()] || options?.message,
    };
  }
}

export const BusinessErrorCodes = {
  INVALID_ID: 'invalid_id',
  INTERNAL_SERVER_ERROR: 'internal_server_error',
  USER_NOT_FOUND: 'user_not_found',
  USER_ALREADY_REGISTERED: 'user_already_registered',
};