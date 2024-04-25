import { ILike } from 'typeorm';

import { ISearchParameterMovie } from '@core/models/pagination';

export const getMovieFilter = (searchParameter: ISearchParameterMovie) => {
  let where = {};

  if (searchParameter.title) {
    where = { ...where, title: ILike(`%${searchParameter.title}%`) };
  }

  if (searchParameter.tmdbId) {
    where = { ...where, tmdbId: ILike(`%${searchParameter.tmdbId}%`) };
  }

  return { where };
};
