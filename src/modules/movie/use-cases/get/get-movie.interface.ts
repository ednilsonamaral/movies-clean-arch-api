import { MovieEntity } from '@core/db/entities';

export interface IGetMovieUseCase {
  execute(id: string): Promise<MovieEntity>;
}
