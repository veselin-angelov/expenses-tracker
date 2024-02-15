import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transaction } from '@app/transactions/entities';
import { CreateTransactionFromImageCommand } from '@app/transactions/commands/create-transaction-from-image.command';

@CommandHandler(CreateTransactionFromImageCommand)
export class CreateTransactionFromImageHandler
  implements ICommandHandler<CreateTransactionFromImageCommand>
{
  public constructor(private readonly em: EntityManager) {}

  public async execute({
    dto,
    user,
  }: CreateTransactionFromImageCommand): Promise<Transaction> {
    const transaction = new Transaction();

    // TODO: Call OCR service to extract data from image

    transaction.assign(dto, {
      em: this.em,
    });

    transaction.setOwner(user);

    await this.em.persistAndFlush(transaction);

    return transaction;
  }
}
