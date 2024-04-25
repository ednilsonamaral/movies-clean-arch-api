import { ClassConstructor, plainToInstance } from 'class-transformer';

import { Dictionary } from '@core/models/dictionary';

export function serializeEntity<T> (entity: ClassConstructor<T>, data: T): T {
  const entitySerialized = plainToInstance(entity, data);

  return entitySerialized;
}

export function serializeFilters<T = unknown> (filters: Dictionary<T>[]) {
  const where = [];

  for (const filter of filters) {
    where.push({ ...filter });
  }

  return where;
}
