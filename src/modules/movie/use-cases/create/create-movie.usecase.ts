import { inject, injectable } from 'inversify';

import { MovieEntity } from '@core/db/entities';
import { IMovieRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { CreateMovieDTO } from '@modules/movie/dtos';
import { ICreateMovieUseCase } from '@modules/movie/use-cases/create';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class CreateMovieUseCase implements ICreateMovieUseCase {
  constructor (
    @inject(Types.MovieRepository)
    private readonly movieRepository: IMovieRepository
  ) {}

  async execute (dto: CreateMovieDTO): Promise<MovieEntity> {
    const exists = await this.movieRepository.selectOneByOptions({
      where: [ { title: dto.title, tmdbId: dto.tmdbId } ],
    });

    if (exists) {
      throw new BusinessError(BusinessErrorCodes.MOVIE_ALREADY_REGISTERED);
    }

    try {
      const adminCreated = await this.movieRepository.create({
        tmdbId: dto.tmdbId,
        originalTitle: dto.originalTitle,
        title: dto.title,
        description: dto.description,
        mediaType: dto.mediaType,
        adult: dto.adult,
        originalLanguage: dto.originalLanguage,
        releaseDate: !dto.releaseDate ? null : new Date(dto.releaseDate),
        voteAverage: dto.voteAverage,
        voteCount: dto.voteCount,
        createdBy: 'SUPER_ADMIN',
        updatedBy: 'SUPER_ADMIN',
      });

      return serializeEntity<MovieEntity>(MovieEntity, adminCreated);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
