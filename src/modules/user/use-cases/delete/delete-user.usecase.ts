import { inject, injectable } from 'inversify';

import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import Types from '@core/types';

import { IDeleteUserUseCase } from '@modules/user/use-cases/delete/delete-user.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute (id: string, actor: UserEntity): Promise<void> {
    try {
      const user = await this.userRepository.selectById(id);

      if (!user) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

      user.deletedAt = new Date();
      user.deletedBy = (actor && actor.id) || 'SUPER_ADMIN';

      await this.userRepository.updateById(id, user);
      await this.userRepository.deleteById(id);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}