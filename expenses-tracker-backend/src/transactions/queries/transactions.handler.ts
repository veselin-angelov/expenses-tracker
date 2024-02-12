import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Transaction } from '@app/transactions/entities';
import { GetUserTransactionsQuery } from '@app/transactions/queries';
import { TransactionRepository } from '../repositories';

@QueryHandler(GetUserTransactionsQuery)
export class GetUserTransactionsHandler
  implements IQueryHandler<GetUserTransactionsQuery>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute({ userId }: GetUserTransactionsQuery): Promise<Transaction[]> {
    return this.transactionRepository.find({ owner: userId });
  }
}
