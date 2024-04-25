import { UserEntity } from '@core/db/entities';

import { CreateUserDTO } from '@modules/user/dtos';

export interface ICreateUserUseCase {
  execute(dto: CreateUserDTO, actor: UserEntity): Promise<UserEntity>;
}
