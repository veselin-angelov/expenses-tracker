import { ResultWithCountDto } from '@app/shared/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../entities';

export class TransactionsResultWithCountDto extends ResultWithCountDto<Transaction> {
  @ApiProperty({
    type: () => Transaction,
    isArray: true,
  })
  public result: Transaction[];
}
