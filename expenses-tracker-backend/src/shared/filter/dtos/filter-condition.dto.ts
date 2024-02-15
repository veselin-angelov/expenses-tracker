import { plainToInstance, Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { isArray, isObject } from 'lodash';
import { Conditions } from '@app/shared/filter/enums';

export type ValueType = string | number | Date;

export class FilterConditionDto {
  @IsString()
  @IsNotEmpty()
  public field: string;

  @ValidateIf(
    (object) =>
      !isArray(object.value) ||
      object.value.every(
        (v: ValueType | FilterConditionDto) =>
          !(v instanceof FilterConditionDto),
      ),
  )
  @IsEnum(Conditions)
  public condition?: Conditions;

  @IsOptional()
  @Transform(({ value }) => {
    if (!isArray(value) || !value.every((v) => isObject(v) && 'field' in v)) {
      return value;
    }

    return value.map((v) => plainToInstance(FilterConditionDto, v));
  })
  public value: ValueType | (ValueType | FilterConditionDto)[];
}
