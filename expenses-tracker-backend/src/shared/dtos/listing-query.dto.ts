import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, ValidateNested } from 'class-validator';
import {
  FilterConditionDto,
  FiltersDto,
  GroupedConditionsDto,
} from '@app/shared/filter/dtos';
import { TransformFilters } from '@app/shared/filter/decorators';

export class ListingQueryDto {
  @ApiProperty({
    required: false,
  })
  @Max(300)
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public offset?: number;

  @ApiProperty({
    type: () => FiltersDto,
    description: 'A json string with the filters',
  })
  @TransformFilters()
  @ValidateNested()
  @IsOptional()
  public filters: (FilterConditionDto | GroupedConditionsDto)[] = [];

  // @Validate(SortPairConstraint)
  // @ApiProperty({
  //   required: false,
  // })
  // @IsArray()
  // @IsOptional()
  // public sort?: string[];
}
