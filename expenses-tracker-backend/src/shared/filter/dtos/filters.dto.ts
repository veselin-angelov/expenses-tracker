import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Transform } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { FilterConditionDto } from './filter-condition.dto';
import { GroupedConditionsDto } from './group-condition.dto';

export class FiltersDto {
  @ApiProperty({
    type: () => FilterConditionDto,
    isArray: true,
    required: false,
  })
  @Transform(({ value }) =>
    value.map((v: any) => {
      if ('type' in v) {
        return plainToInstance(GroupedConditionsDto, v);
      }

      return plainToInstance(FilterConditionDto, v);
    }),
  )
  @ValidateNested()
  @IsOptional()
  public conditions?: (FilterConditionDto | GroupedConditionsDto)[];
}
