import { injectable } from 'inversify';
import {
  DeleteResult,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { MovieEntity } from '@core/db/entities';
import { getMovieFilter } from '@core/db/repositories/movie/movie.filter';
import { IMovieRepository } from '@core/db/repositories/movie/movie.interface';
import { ISearchParameterMovie, Pagination } from '@core/models/pagination';

import { PersistenceError, PersistenceErrorCodes } from '@shared/errors';

@injectable()
export class MovieRepository implements IMovieRepository {
  private movieRepository: Repository<MovieEntity> = getRepository(MovieEntity);

  async selectPagination (searchParameter: ISearchParameterMovie): Promise<Pagination<MovieEntity>> {
    let response: Pagination<MovieEntity> | null = null;

    const { where } = getMovieFilter(searchParameter);

    try {
      const [ rows, count ] = await this.movieRepository.findAndCount({
        where,
        skip: searchParameter.offset || 0,
        take: searchParameter.limit || 10,
        order: {
          [searchParameter.orderBy]: searchParameter.isDESC ? 'DESC' : 'ASC',
        },
      });

      response = {
        rows,
        count,
      };
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.PAGINATION_ENTITY, err);
    }

    return response;
  }

  async create (movie: MovieEntity): Promise<MovieEntity> {
    let response: MovieEntity | null = null;

    try {
      response = await this.movieRepository.save(movie);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.CREATE_ENTITY, err);
    }

    return response;
  }

  async selectById (id: string): Promise<MovieEntity | null> {
    let response: MovieEntity | null = null;

    try {
      response = await this.movieRepository.findOne({ where: { id } });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async updateById (id: string, movie: MovieEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.movieRepository.update(id, movie);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async selectByOptions (options?: FindManyOptions<MovieEntity>): Promise<(MovieEntity | null)[]> {
    let response: MovieEntity[] | null = null;

    try {
      response = await this.movieRepository.find(options);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectOneByOptions (options?: FindManyOptions<MovieEntity>): Promise<MovieEntity | null> {
    let response: MovieEntity | null = null;

    try {
      const [ movie ] = await this.movieRepository.find({ ...options, take: 1 });
      response = movie;

    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async deleteById (id: string): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.movieRepository.softDelete({ id });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }
}
