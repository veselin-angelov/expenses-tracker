import { EntityManager } from '@mikro-orm/postgresql';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transaction } from '@app/transactions/entities';
import { CreateTransactionFromImageCommand } from '@app/transactions/commands/create-transaction-from-image.command';
import { FileRepository } from '@app/files/repositories';
import { OcrService } from '@app-libs/ocr';
import { ObjectsService } from '@lab08/nestjs-s3';
import type { Readable } from 'stream';
import { Currency } from '@app/transactions/enums';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

@CommandHandler(CreateTransactionFromImageCommand)
export class CreateTransactionFromImageHandler
  implements ICommandHandler<CreateTransactionFromImageCommand>
{
  public constructor(
    private readonly em: EntityManager,
    private readonly fileRepository: FileRepository,
    private readonly ocrService: OcrService,
    private readonly objectsService: ObjectsService,
  ) {}

  public async execute({
    dto,
    user,
  }: CreateTransactionFromImageCommand): Promise<Transaction> {
    const transaction = new Transaction();

    const file = await this.fileRepository.findOneOrFail({
      id: dto.receipt,
      createdBy: user,
    });

    const fileObj = await this.objectsService.getObject(
      file.bucket,
      file.remote,
    );

    const receipt = await this.ocrService.processReceiptImage({
      dataStream: fileObj.Body as Readable,
      fileName: file.fileName,
      fileMimeType: file.mimeType,
    });

    if (!receipt) {
      throw new RuntimeException('Failed to process receipt image');
    }

    transaction.assign(
      {
        receipt: file,
        owner: user,
        date: receipt.date ?? new Date(),
        amount: String(receipt.total),
        merchantName: receipt.merchant?.name,
        merchantAddress: receipt.merchant?.address,
        currency: receipt.currency as Currency,
      },
      {
        em: this.em,
      },
    );

    await this.em.persistAndFlush(transaction);

    return transaction;
  }
}
