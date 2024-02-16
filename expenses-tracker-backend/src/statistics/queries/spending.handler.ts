import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SpendingQuery } from '@app/statistics/queries/spending.query';
import { SpendingResultDto } from '@app/statistics/dtos';
import { Inject } from '@nestjs/common';
import { SPENDING_QUERY_SERVICE } from '@app/statistics/constants';
import { ISpendingQuery } from '@app/statistics/interfaces';
import { Period } from '@app/statistics/enums';

@QueryHandler(SpendingQuery)
export class SpendingHandler implements IQueryHandler<SpendingQuery> {
  constructor(
    @Inject(SPENDING_QUERY_SERVICE)
    private readonly queries: (period: Period) => ISpendingQuery,
  ) {}

  async execute({ dto, user }: SpendingQuery): Promise<SpendingResultDto> {
    return await this.queries(dto.period).getResults(dto, user);
  }
}
