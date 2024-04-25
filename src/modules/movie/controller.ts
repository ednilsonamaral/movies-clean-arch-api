import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  interfaces,
} from 'inversify-express-utils';

import { MovieEntity } from '@core/db/entities';
import { ICustomRequest } from '@core/models/custom-request';
import Types from '@core/types';

import { getMovieFilter } from '@modules/movie/helper';
import { IGetAllMovieUseCase, IGetMovieUseCase } from '@modules/movie/use-cases';

@controller('/movie')
export class MovieController extends BaseHttpController implements interfaces.Controller {
  constructor (
    @inject(Types.GetMovieUseCase)
      private getMovieUseCase: IGetMovieUseCase,
    @inject(Types.GetAllMovieUseCase)
      private getAllMoviesUseCase: IGetAllMovieUseCase
  ) {
    super();
  }

  @httpGet('/all')
  public async getAllMovies (req: ICustomRequest): Promise<any> {
    const { searchParameter } = getMovieFilter(req, false);
    return this.getAllMoviesUseCase.execute(searchParameter);
  }

  @httpGet('/:id')
  public async getMovieById (req: ICustomRequest): Promise<MovieEntity> {
    return this.getMovieUseCase.execute(req.params.id);
  }
}