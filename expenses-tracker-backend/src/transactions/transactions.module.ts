import { forwardRef, Module, Provider } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CqrsModule } from '@nestjs/cqrs';
import { Transaction } from '@app/transactions/entities';
import { TransactionsController } from '@app/transactions/http';
import {
  TransactionHandler,
  TransactionsHandler,
} from '@app/transactions/queries';
import {
  CreateTransactionFromImageHandler,
  SaveTransactionHandler,
} from '@app/transactions/commands';
import { FilesModule } from '@app/files/files.module';
import { OcrConfig, OcrModule } from '@app-libs/ocr';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OCR_CONFIG_KEY } from '@app/config';

const controllers = [TransactionsController];

const queryHandlers = [TransactionsHandler, TransactionHandler];

const commandHandlers = [
  SaveTransactionHandler,
  CreateTransactionFromImageHandler,
];

const sharedProviders: Provider[] = [...queryHandlers, ...commandHandlers];

@Module({
  imports: [
    forwardRef(() => FilesModule),
    CqrsModule,
    MikroOrmModule.forFeature({
      entities: [Transaction],
    }),
    OcrModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { apiUrl, apiKey } =
          configService.get<OcrConfig>(OCR_CONFIG_KEY)!;

        return {
          apiUrl,
          apiKey,
        };
      },
    }),
  ],
  controllers: controllers,
  providers: sharedProviders,
  exports: [...sharedProviders, MikroOrmModule],
})
export class TransactionModule {}
