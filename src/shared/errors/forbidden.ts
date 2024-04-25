import { CustomError } from 'ts-custom-error';

export class ForbiddenError extends CustomError {
  isForbiddenError = true;

  constructor () {
    super();
  }
}
