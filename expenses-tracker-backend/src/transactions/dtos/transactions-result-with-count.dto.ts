import { ApiProperty } from '@nestjs/swagger';
import { ResultWithCountDto } from '@app/shared/dtos';
import { Transaction } from '@app/transactions/entities';

export class TransactionsResultWithCountDto extends ResultWithCountDto<Transaction> {
  @ApiProperty({
    type: () => Transaction,
    isArray: true,
  })
  public result: Transaction[];
}
