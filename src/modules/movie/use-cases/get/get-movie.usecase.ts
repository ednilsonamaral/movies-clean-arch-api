import { inject, injectable } from 'inversify';

import { MovieEntity } from '@core/db/entities';
import { IMovieRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';
import { IGetMovieUseCase } from '@modules/movie/use-cases/get/get-movie.interface';
import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class GetMovieUseCase implements IGetMovieUseCase {
  constructor (
    @inject(Types.MovieRepository)
    private readonly movieRepository: IMovieRepository
  ) { }

  async execute (id: string): Promise<MovieEntity> {
    try {
      const movie = await this.movieRepository.selectById(id);

      if (!movie) throw new BusinessError(BusinessErrorCodes.MOVIE_NOT_FOUND);

      return serializeEntity<MovieEntity>(MovieEntity, movie);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
