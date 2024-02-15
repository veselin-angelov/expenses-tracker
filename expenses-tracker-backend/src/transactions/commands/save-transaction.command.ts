import { ICommand } from '@nestjs/cqrs';
import { TransactionDto } from '@app/transactions/dtos';
import { FilterQuery } from '@mikro-orm/core';
import { Transaction } from '@app/transactions/entities';
import { User } from '@app/users/entities';

export class SaveTransactionCommand implements ICommand {
  constructor(
    public readonly dto: TransactionDto,
    public readonly user: User,
    public readonly permissionsFilter?: FilterQuery<Transaction>,
    public readonly id?: string,
  ) {}
}
