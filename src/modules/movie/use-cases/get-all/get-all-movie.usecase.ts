import { inject, injectable } from 'inversify';

import { getMovieFilter, IMovieRepository } from '@core/db/repositories';
import { ISearchParameterMovie } from '@core/models/pagination';
import Types from '@core/types';
import { IGetAllMovieUseCase } from '@modules/movie/use-cases/get-all';
import { BusinessError, BusinessErrorCodes } from '@shared/errors';

import MovieAPIService from '@shared/mechanisms/api/service';

@injectable()
export class GetAllMovieUseCase implements IGetAllMovieUseCase {
  constructor (
    @inject(Types.MovieRepository)
    private readonly movieRepository: IMovieRepository
  ) { }

  async execute (searchParameter: ISearchParameterMovie): Promise<any> {
    const { where } = getMovieFilter(searchParameter);

    try {
      const localMovies = await this.movieRepository.selectByOptions(where);

      if (localMovies.length === 0) {
        const movies = await MovieAPIService.getTrendingMovies();

        const moviesMapped = [];

        await movies?.results?.map(async (movie: any) => {
          const created = await this.movieRepository.create({
            tmdbId: movie.id,
            originalTitle: movie.original_title,
            title: movie.title,
            description: movie.overview,
            mediaType: movie.media_type,
            adult: false,
            originalLanguage: movie.original_language,
            releaseDate: !movie.release_date ? null : new Date(movie.release_date),
            voteAverage: Math.round(movie.vote_average),
            voteCount: movie.vote_count
          });

          moviesMapped.push(created);
        });

        return moviesMapped;
      }

      return localMovies;
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
