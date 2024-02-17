import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { omit } from 'lodash';
import { SaveTransactionCommand } from '@app/transactions/commands/save-transaction.command';
import { TransactionRepository } from '@app/transactions/repositories';
import { Transaction } from '@app/transactions/entities';
import { FilterQuery } from '@mikro-orm/core';

@CommandHandler(SaveTransactionCommand)
export class SaveTransactionHandler
  implements ICommandHandler<SaveTransactionCommand>
{
  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly em: EntityManager,
  ) {}

  public async execute({
    dto,
    user,
    permissionsFilter,
    id,
  }: SaveTransactionCommand): Promise<Transaction> {
    const transaction = await this.findOneOrCreate(id, permissionsFilter);

    transaction.assign(omit(dto, ['id']), {
      em: this.em,
    });

    transaction.setOwner(user);

    await this.em.persistAndFlush(transaction);
    return transaction;
  }

  private async findOneOrCreate(
    id?: string,
    permissionsFilter?: FilterQuery<Transaction>,
  ): Promise<Transaction> {
    if (id) {
      return this.transactionRepository.findOneOrFail({
        $and: [
          { id },
          { ...(permissionsFilter ? (permissionsFilter as any) : null) },
        ],
      });
    }

    return new Transaction();
  }
}
