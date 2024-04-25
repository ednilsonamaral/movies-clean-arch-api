import { ISearchParameterMovie } from '@src/core/models/pagination';

import { MovieEntity } from '@core/db/entities';

export interface IGetAllMovieUseCase {
  execute(searchParameter: ISearchParameterMovie): Promise<any>;
}
