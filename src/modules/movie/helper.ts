import { ICustomRequest } from '@core/models/custom-request';
import { ISearchParameterMovie } from '@core/models/pagination';

import { controllerPaginationHelper } from '@shared/utils';

export const getMovieFilter = (req: ICustomRequest, pagination = true) => {
  const searchParameter: ISearchParameterMovie = {
    ...(req.query &&
      req.query.title && {
      title: req.query.title.toString(),
    }),
    ...(req.query &&
      req.query.tmdbId && {
      tmdbId: Number(req.query.tmdbId),
    }),
    ...controllerPaginationHelper(req.query),
  };

  if (!pagination) {
    delete searchParameter.offset;
    delete searchParameter.limit;
  }

  return { searchParameter };
};