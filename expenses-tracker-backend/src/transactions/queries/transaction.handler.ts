import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionQuery } from '@app/transactions/queries/transaction.query';
import { TransactionRepository } from '@app/transactions/repositories';
import { Transaction } from '@app/transactions/entities';

@QueryHandler(TransactionQuery)
export class TransactionHandler implements IQueryHandler<TransactionQuery> {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute({
    id,
    permissionsFilter,
  }: TransactionQuery): Promise<Transaction> {
    return await this.transactionRepository.findOneOrFail({
      $and: [
        { ...(permissionsFilter ? (permissionsFilter as any) : null) },
        { id },
      ],
    });
  }
}
