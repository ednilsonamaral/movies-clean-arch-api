export interface Pagination<T> {
  rows: T[];
  count: number;
}

export interface ICount {
  count: number;
}

export interface ISearchParameterBase {
  offset?: number;
  orderBy?: string;
  isDESC?: boolean;
  limit?: number;
}

export interface ISearchParameterUser extends ISearchParameterBase {
  name?: string;
  email?: string;
  document?: string;
}

export interface ISearchParameterMovie extends ISearchParameterBase {
  title?: string;
  tmdbId?: number;
}