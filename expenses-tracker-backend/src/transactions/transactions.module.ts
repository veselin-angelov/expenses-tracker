import { Module, Provider } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CqrsModule } from '@nestjs/cqrs';
import { Transaction } from '@app/transactions/entities';
import { TransactionsController } from '@app/transactions/http';
import { GetUserTransactionsHandler } from '@app/transactions/queries';

const controllers = [TransactionsController];

const queryHandlers = [GetUserTransactionsHandler];

const sharedProviders: Provider[] = [...queryHandlers];

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
