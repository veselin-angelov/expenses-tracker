import { ICommand } from '@nestjs/cqrs';
import { TransactionFromImageDto } from '@app/transactions/dtos';
import { User } from '@app/users/entities';

export class CreateTransactionFromImageCommand implements ICommand {
  constructor(
    public readonly dto: TransactionFromImageDto,
    public readonly user: User,
  ) {}
}
