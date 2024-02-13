import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserTransactionsQuery } from '@app/transactions/queries';
import { TransactionRepository } from '../repositories';
import { TransactionsResultWithCountDto } from '../dtos/transactions-with-count.dto';

@QueryHandler(GetUserTransactionsQuery)
export class GetUserTransactionsHandler
  implements IQueryHandler<GetUserTransactionsQuery>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute({
    userId,
  }: GetUserTransactionsQuery): Promise<TransactionsResultWithCountDto> {
    const [result, count] = await this.transactionRepository.findAndCount({
      owner: userId,
    });

    return new TransactionsResultWithCountDto(result, count);
  }
}
