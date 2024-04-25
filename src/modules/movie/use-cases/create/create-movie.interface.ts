import { MovieEntity } from '@core/db/entities';

import { CreateMovieDTO } from '@modules/movie/dtos';

export interface ICreateMovieUseCase {
  execute(dto: CreateMovieDTO): Promise<MovieEntity>;
}
