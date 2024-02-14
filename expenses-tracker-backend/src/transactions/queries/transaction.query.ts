import { FilterQuery } from '@mikro-orm/core';
import { IQuery } from '@nestjs/cqrs';
import { Transaction } from '@app/transactions/entities';

export class TransactionQuery implements IQuery {
  public constructor(
    public readonly id: string,
    public readonly permissionsFilter?: FilterQuery<Transaction>,
  ) {}
}
