import { DeleteResult, FindManyOptions, UpdateResult } from 'typeorm';

import { UserEntity } from '@core/db/entities';
import { ISearchParameterUser, Pagination } from '@core/models/pagination';

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  updateById(id: string, user: UserEntity): Promise<UpdateResult>;
  selectById(id: string): Promise<UserEntity | null>;
  selectPagination(searchParameter: ISearchParameterUser): Promise<Pagination<UserEntity>>;
  selectByOptions(options?: FindManyOptions<UserEntity>): Promise<(UserEntity | null)[]>;
  selectOneByOptions(options?: FindManyOptions<UserEntity>): Promise<UserEntity | null>;
  deleteById(id: string): Promise<DeleteResult>;
}
