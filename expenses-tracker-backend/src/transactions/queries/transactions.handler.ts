import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionsQuery } from '@app/transactions/queries/transactions.query';
import { TransactionRepository } from '@app/transactions/repositories';
import { TransactionsResultWithCountDto } from '@app/transactions/dtos';
import { FilterQuery, QueryOrder } from '@mikro-orm/core';
import { Transaction } from '@app/transactions/entities';
import { FiltersQueryBuilderService } from '@app/shared/filter/services';

@QueryHandler(TransactionsQuery)
export class TransactionsHandler implements IQueryHandler<TransactionsQuery> {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly filtersQueryBuilderService: FiltersQueryBuilderService,
  ) {}

  async execute({
    query,
    permissionFilters,
  }: TransactionsQuery): Promise<TransactionsResultWithCountDto> {
    const filters: FilterQuery<Transaction> = {
      $and: [
        {
          ...(permissionFilters ? (permissionFilters as any) : null),
        },
        {
          ...(this.filtersQueryBuilderService.getQuery(query.filters) as any),
        },
      ],
    };

    const [result, count] = await this.transactionRepository.findAndCount(
      filters,
      {
        limit: query.limit,
        offset: query.offset,
        orderBy: { date: QueryOrder.DESC },
      },
    );

    return new TransactionsResultWithCountDto(result, count);
  }
}
