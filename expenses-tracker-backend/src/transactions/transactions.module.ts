import { Module, Provider } from '@nestjs/common';
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

const controllers = [TransactionsController];

const queryHandlers = [TransactionsHandler, TransactionHandler];

const commandHandlers = [
  SaveTransactionHandler,
  CreateTransactionFromImageHandler,
];

const sharedProviders: Provider[] = [...queryHandlers, ...commandHandlers];

@Module({
  imports: [
    CqrsModule,
    MikroOrmModule.forFeature({
      entities: [Transaction],
    }),
  ],
  controllers: controllers,
  providers: sharedProviders,
  exports: [...sharedProviders, MikroOrmModule],
})
export class TransactionModule {}
