import { inject, injectable } from 'inversify';

import { UserEntity } from '@src/core/db/entities';
import { IUserRepository } from '@src/core/db/repositories';
import { serializeEntity } from '@src/core/db/utils';
import Types from '@src/core/types';
import { IGetUserUseCase } from '@src/modules/user/use-cases/get/get-user.interface';
import { BusinessError, BusinessErrorCodes } from '@src/shared/errors';

@injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly adminRepository: IUserRepository
  ) { }

  async execute (id: string): Promise<UserEntity> {
    try {
      const user = await this.adminRepository.selectById(id);

      if (!user) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

      return serializeEntity<UserEntity>(UserEntity, user);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
