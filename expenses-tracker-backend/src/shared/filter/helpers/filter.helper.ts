import { FilterQuery } from '@mikro-orm/core';
import { plainToInstance } from 'class-transformer';
import { isArray } from 'lodash';
import {
  FilterConditionDto,
  GroupedConditionsDto,
  ValueType,
} from '@app/shared/filter/dtos';
import { Conditions, GroupCondition } from '@app/shared/filter/enums';

export const buildFilter =
  (
    whitelist: string[] = [],
  ): ((condition: FilterConditionDto | GroupedConditionsDto) => boolean) =>
  (condition: FilterConditionDto | GroupedConditionsDto) => {
    if (whitelist.length === 0 || condition instanceof GroupedConditionsDto) {
      return true;
    }

    return whitelist.includes(condition.field);
  };

export const buildSimpleConditions = (
  filterCondition: FilterConditionDto,
): FilterQuery<any> => {
  switch (filterCondition.condition) {
    case Conditions.EQUAL:
      return { [filterCondition.field]: filterCondition.value };
    case Conditions.NOT_EQUAL:
      return {
        [filterCondition.field]: {
          $ne: filterCondition.value,
        },
      };
    case Conditions.GREATER:
      return {
        [filterCondition.field]: {
          $gt: filterCondition.value,
        },
      };
    case Conditions.GREATER_OR_EQUAL:
      return {
        [filterCondition.field]: {
          $gte: filterCondition.value,
        },
      };
    case Conditions.LOWER:
      return {
        [filterCondition.field]: {
          $lt: filterCondition.value,
        },
      };
    case Conditions.LOWER_OR_EQUAL:
      return {
        [filterCondition.field]: {
          $lte: filterCondition.value,
        },
      };
    case Conditions.IN:
      return {
        [filterCondition.field]: {
          $in: filterCondition.value,
        },
      };
    case Conditions.NOT_IN:
      return {
        [filterCondition.field]: {
          $nin: filterCondition.value,
        },
      };
    case Conditions.LIKE:
      return {
        [filterCondition.field]: {
          $ilike: `%${filterCondition.value}%`,
        },
      };
    case Conditions.STARTS_WITH:
      return {
        [filterCondition.field]: {
          $ilike: `${filterCondition.value}%`,
        },
      };
    case Conditions.ENDS_WITH:
      return {
        [filterCondition.field]: {
          $ilike: `%${filterCondition.value}`,
        },
      };
    default:
      return null;
  }
};

export const buildFromFilterCondition = (
  filterCondition: FilterConditionDto,
  whitelist: string[] = [],
): FilterQuery<any> => {
  if (
    isArray(filterCondition.value) &&
    (filterCondition.value as any[]).every(
      (v) => v instanceof FilterConditionDto,
    )
  ) {
    return {
      [filterCondition.field]: (
        filterCondition.value as (ValueType | FilterConditionDto)[]
      ).reduce(
        (a, v) => ({
          ...a,
          ...buildFromFilterCondition(v as FilterConditionDto, whitelist),
        }),
        {},
      ),
    };
  }

  return buildSimpleConditions(filterCondition);
};

export const buildFromGroupedCondition = (
  groupedCondition: GroupedConditionsDto,
  whitelist: string[] = [],
): FilterQuery<any> => ({
  [groupedCondition.type === GroupCondition.AND ? '$and' : '$or']:
    groupedCondition.conditions
      .filter(buildFilter(whitelist))
      .map((c: GroupedConditionsDto | FilterConditionDto) => {
        if (c instanceof GroupedConditionsDto) {
          return buildFromGroupedCondition(c, whitelist);
        }

        return buildFromFilterCondition(c, whitelist);
      }),
});

export const filtersPlainToInstance = (data: any[]) => {
  return data.map((v: any) => {
    if ('type' in v) {
      return plainToInstance(GroupedConditionsDto, v);
    }

    return plainToInstance(FilterConditionDto, v);
  });
};
