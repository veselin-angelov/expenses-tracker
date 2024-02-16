import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StatisticsController } from '@app/statistics/http';
import { SpendingHandler } from '@app/statistics/queries';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  MonthlySpendingQuery,
  WeeklySpendingQuery,
  YearlySpendingQuery,
} from '@app/statistics/services';
import { Period } from '@app/statistics/enums';
import { ISpendingQuery } from '@app/statistics/interfaces';
import { SPENDING_QUERY_SERVICE } from '@app/statistics/constants';

const controllers = [StatisticsController];

const queryHandlers = [SpendingHandler];

const services = [
  {
    provide: SPENDING_QUERY_SERVICE,
    inject: [EntityManager],
    useFactory: (em: EntityManager) => {
      return (period: Period): ISpendingQuery => {
        const services: Record<Period, ISpendingQuery> = {
          [Period.YEARLY]: new YearlySpendingQuery(em),
          [Period.MONTHLY]: new MonthlySpendingQuery(em),
          [Period.WEEKLY]: new WeeklySpendingQuery(em),
        };

        return services[period];
      };
    },
  },
];

const sharedProviders: Provider[] = [...queryHandlers, ...services];

@Module({
  imports: [CqrsModule],
  controllers: controllers,
  providers: sharedProviders,
  exports: [...sharedProviders],
})
export class StatisticsModule {}
