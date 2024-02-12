import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CurrencyEnum } from '@app/transactions/enums';

export class QueryTransactionDto {
  @IsOptional()
  @IsString()
  readonly merchantName?: string;

  @IsOptional()
  @IsString()
  readonly merchantAddress?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDateString()
  readonly dateFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDateString()
  readonly dateTo?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minAmount?: number;

  @IsOptional()
  @IsNumber()
  @Max(Number.MAX_SAFE_INTEGER)
  readonly maxAmount?: number;

  @IsOptional()
  @IsEnum(CurrencyEnum)
  readonly currency?: CurrencyEnum;
}
