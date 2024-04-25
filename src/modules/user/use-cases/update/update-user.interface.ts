import { UserEntity } from '@core/db/entities';

import { UpdateUserDTO } from '@modules/user/dtos';

export interface IUpdateUserUseCase {
  execute(id: string, dto: UpdateUserDTO, actor: UserEntity): Promise<UserEntity>;
}
