import { filtersPlainToInstance } from '@app/shared/filter/helpers';
import { Transform } from 'class-transformer';
import { isArray, isString } from 'lodash';

export const TransformFilters = (body = false): PropertyDecorator => {
  return Transform(({ value }) => {
    if (body) {
      return filtersPlainToInstance(value);
    }

    if (isArray(value)) {
      return value;
    }

    if (!value || !isString(value)) {
      return null;
    }

    return filtersPlainToInstance(JSON.parse(value));
  });
};
