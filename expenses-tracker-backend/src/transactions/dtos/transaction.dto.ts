import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { CurrencyEnum } from '@app/transactions/enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { FileExistsConstraint } from '@app/files/constraints';

export class TransactionDto {
  @ApiHideProperty()
  @IsUUID()
  @IsOptional()
  public id?: string;

  @ApiProperty()
  @MaxLength(255)
  @IsString()
  @IsOptional()
  public merchantName?: string;

  @ApiProperty()
  @MaxLength(255)
  @IsString()
  @IsOptional()
  public merchantAddress?: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  @ValidateIf((object, value) => !object.id || !!value)
  public amount?: string;

  @ApiProperty({
    enum: CurrencyEnum,
  })
  @IsEnum(CurrencyEnum)
  @IsNotEmpty()
  @ValidateIf((object, value) => !object.id || !!value)
  public currency?: CurrencyEnum;

  @ApiProperty({
    description: 'The date of the transaction, if empty it will be set to now',
  })
  @IsDateString()
  @IsOptional()
  public date?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty()
  @Validate(FileExistsConstraint)
  @IsUUID()
  @IsOptional()
  public receipt?: string;
}
