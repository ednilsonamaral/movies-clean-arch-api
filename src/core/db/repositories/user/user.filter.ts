import { ILike } from 'typeorm';

import { ISearchParameterUser } from '@core/models/pagination';

export const getUserFilter = (searchParameter: ISearchParameterUser) => {
  let where = {};

  if (searchParameter.name) {
    where = { ...where, name: ILike(`%${searchParameter.name}%`) };
  }

  if (searchParameter.email) {
    where = { ...where, email: ILike(`%${searchParameter.email}%`) };
  }

  return { where };
};
