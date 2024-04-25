import { inject, injectable } from 'inversify';

import { UserEntity } from '@src/core/db/entities';
import { getUserFilter, IUserRepository } from '@src/core/db/repositories';
import { serializeEntity } from '@src/core/db/utils';
import { ISearchParameterUser } from '@src/core/models/pagination';
import Types from '@src/core/types';
import { IGetAllUsersUseCase } from '@src/modules/user/use-cases/get-all/get-all-user.interface';
import { BusinessError, BusinessErrorCodes } from '@src/shared/errors';

@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly adminRepository: IUserRepository
  ) { }

  async execute (searchParameter: ISearchParameterUser): Promise<UserEntity[]> {
    const { where } = getUserFilter(searchParameter);

    try {
      const admins = await this.adminRepository.selectByOptions({ where });

      return admins.map(user => serializeEntity<UserEntity>(UserEntity, user));
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
