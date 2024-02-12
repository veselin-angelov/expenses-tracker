import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CurrencyEnum } from '@app/transactions/enums';

export class CreateTransactionDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly merchantName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly merchantAddress?: string;

  @IsNumber()
  readonly amount: number;

  @IsEnum(CurrencyEnum)
  readonly currency: CurrencyEnum;

  @IsOptional()
  @IsDateString()
  readonly date?: Date;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
