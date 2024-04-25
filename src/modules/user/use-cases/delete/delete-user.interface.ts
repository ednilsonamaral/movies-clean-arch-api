import { UserEntity } from '@core/db/entities';

export interface IDeleteUserUseCase {
  execute(id: string, actor: UserEntity): Promise<void>;
}
