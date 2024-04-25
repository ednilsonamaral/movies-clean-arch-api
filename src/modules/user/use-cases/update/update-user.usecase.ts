import { inject, injectable } from 'inversify';

import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { UpdateUserDTO } from '@modules/user/dtos';
import { IUpdateUserUseCase } from '@modules/user/use-cases/update';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly adminRepository: IUserRepository
  ) {}

  async execute (userId: string, dto: UpdateUserDTO, actor: UserEntity): Promise<UserEntity> {
    const user = await this.adminRepository.selectById(userId);

    if (!user) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    try {
      await this.adminRepository.updateById(userId, {
        ...dto.name && { name: dto.name },
        ...dto.email && { email: dto.email },
        document: user.document,
        birthDate: !user.birthDate ? null : new Date(user.birthDate),
        phone: user.phone,
        ...dto.role && { role: dto.role },
        updatedBy: (actor && actor.id) || 'SUPER_ADMIN',
      });

      const adminUpdated = await this.adminRepository.selectById(userId);

      return serializeEntity<UserEntity>(UserEntity, adminUpdated);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
