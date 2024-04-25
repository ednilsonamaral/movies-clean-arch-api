import { inject, injectable } from 'inversify';

import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { CreateUserDTO } from '@modules/user/dtos';
import { ICreateUserUseCase } from '@modules/user/use-cases/create';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';
import { RoleType } from '@src/shared/enumerators';

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute (dto: CreateUserDTO, actor: UserEntity): Promise<UserEntity> {
    const exists = await this.userRepository.selectOneByOptions({
      where: [ { email: dto.email, document: dto.document } ],
    });

    if (exists) {
      throw new BusinessError(BusinessErrorCodes.USER_ALREADY_REGISTERED);
    }

    try {
      const adminCreated = await this.userRepository.create({
        name: dto.name,
        email: dto.email,
        document: dto.document,
        birthDate: !dto.birthDate ? null : new Date(dto.birthDate),
        phone: dto.phone,
        role: dto.role ?? RoleType.READ_ONLY,
        createdBy: (actor && actor.id) || 'SUPER_ADMIN',
        updatedBy: (actor && actor.id) || 'SUPER_ADMIN',
      });

      return serializeEntity<UserEntity>(UserEntity, adminCreated);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
