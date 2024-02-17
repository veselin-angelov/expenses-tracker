import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, ValidateNested } from 'class-validator';
import {
  FilterConditionDto,
  FiltersDto,
  GroupedConditionsDto,
} from '@app/shared/filter/dtos';
import { TransformFilters } from '@app/shared/filter/decorators';
import { Transform } from 'class-transformer';

export class ListingQueryDto {
  @ApiProperty({
    required: false,
  })
  @Max(300)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined), {
    toClassOnly: true,
  })
  public limit?: number;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined), {
    toClassOnly: true,
  })
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
