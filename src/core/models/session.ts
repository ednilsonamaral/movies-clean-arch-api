import { UserEntity } from '@core/db/entities';

export interface ISession extends UserEntity {
  token?: string;
}

export interface IAccessToken {
  accessToken: string;
  refreshToken: string;
}