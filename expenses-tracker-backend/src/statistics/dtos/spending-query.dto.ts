import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  ValidateIf,
} from 'class-validator';
import { Period } from '@app/statistics/enums';

export class SpendingQueryDto {
  @ApiProperty({
    required: true,
    enum: Period,
  })
  @IsEnum(Period)
  @IsNotEmpty()
  public period: Period;

  @ApiProperty({
    required: true,
  })
  // @Max(52)
  // @Min(1)
  @IsNumberString()
  @IsNotEmpty()
  @ValidateIf((o) => o.period === Period.WEEKLY)
  public week?: string;

  @ApiProperty({
    required: true,
  })
  // @Max(12)
  // @Min(1)
  @IsNumberString()
  @IsNotEmpty()
  @ValidateIf((o) => o.period === Period.MONTHLY)
  public month?: string;

  @ApiProperty({
    required: true,
  })
  // @Max(2038)
  // @Min(1970)
  @IsNumberString()
  @IsNotEmpty()
  public year: string;
}
