import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { GroupCondition } from '@app/shared/filter/enums';
import { FilterConditionDto } from '@app/shared/filter/dtos/filter-condition.dto';

export class GroupedConditionsDto {
  @ApiProperty({
    enum: () => GroupCondition,
  })
  @IsEnum(GroupCondition)
  @IsNotEmpty()
  public type: GroupCondition;

  @IsArray()
  @ArrayNotEmpty()
  @Transform(({ value }) =>
    value.map((v: any) => {
      return 'type' in v
        ? plainToInstance(GroupedConditionsDto, v)
        : plainToInstance(FilterConditionDto, v);
    }),
  )
  public conditions: (FilterConditionDto | GroupedConditionsDto)[];
}
