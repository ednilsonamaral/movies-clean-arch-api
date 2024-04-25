import { ISearchParameterUser } from '@src/core/models/pagination';

import { UserEntity } from '@core/db/entities';

export interface IGetAllUsersUseCase {
  execute(searchParameter: ISearchParameterUser): Promise<UserEntity[]>;
}
