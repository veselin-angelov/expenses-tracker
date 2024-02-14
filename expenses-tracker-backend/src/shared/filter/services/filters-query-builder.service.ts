import { FilterQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { FilterConditionDto, GroupedConditionsDto } from '../dtos';
import {
  buildFilter,
  buildFromFilterCondition,
  buildFromGroupedCondition,
} from '../helpers';

@Injectable()
export class FiltersQueryBuilderService {
  public getQuery<T>(
    conditions: (FilterConditionDto | GroupedConditionsDto)[],
    whitelistedFields: string[] = [],
  ): FilterQuery<T> {
    return {
      $and: conditions.filter(buildFilter(whitelistedFields)).map((c) => {
        return c instanceof GroupedConditionsDto
          ? buildFromGroupedCondition(c, whitelistedFields)
          : buildFromFilterCondition(c, whitelistedFields);
      }),
    } as FilterQuery<T>;
  }
}
