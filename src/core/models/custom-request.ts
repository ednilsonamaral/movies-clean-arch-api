import { Request } from 'express';

import { ISession } from '@core/models/session';

export interface ICustomRequest extends Request {
  session: ISession;
}