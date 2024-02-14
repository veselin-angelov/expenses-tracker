import { IsOptional, IsUUID, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileExistsConstraint } from '@app/files/constraints';

export class TransactionFromImageDto {
  @ApiProperty()
  @Validate(FileExistsConstraint)
  @IsUUID()
  @IsOptional()
  public receipt?: string;
}
