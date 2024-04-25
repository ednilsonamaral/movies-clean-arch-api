import { DeleteResult, FindManyOptions, UpdateResult } from 'typeorm';

import { MovieEntity } from '@core/db/entities';
import { ISearchParameterMovie, Pagination } from '@core/models/pagination';

export interface IMovieRepository {
  create(movie: MovieEntity): Promise<MovieEntity>;
  updateById(id: string, movie: MovieEntity): Promise<UpdateResult>;
  selectById(id: string): Promise<MovieEntity | null>;
  selectPagination(searchParameter: ISearchParameterMovie): Promise<Pagination<MovieEntity>>;
  selectByOptions(options?: FindManyOptions<MovieEntity>): Promise<(MovieEntity | null)[]>;
  selectOneByOptions(options?: FindManyOptions<MovieEntity>): Promise<MovieEntity | null>;
  deleteById(id: string): Promise<DeleteResult>;
}
