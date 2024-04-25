import { UserEntity } from '@core/db/entities';

export interface IGetUserUseCase {
  execute(id: string): Promise<UserEntity>;
}
