import { ListingQueryDto } from '@app/shared/dtos';
import { FilterQuery } from '@mikro-orm/core';
import { Transaction } from '@app/transactions/entities';

export class TransactionsQuery {
  constructor(
    public readonly query: ListingQueryDto,
    public readonly permissionFilters?: FilterQuery<Transaction>,
  ) {}
}
