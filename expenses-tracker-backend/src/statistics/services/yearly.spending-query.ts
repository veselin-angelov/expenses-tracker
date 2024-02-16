import { ISpendingQuery } from '@app/statistics/interfaces';
import { SpendingQueryDto, SpendingResultDto } from '@app/statistics/dtos';
import { User } from '@app/users/entities';
import { Transaction } from '@app/transactions/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Granularity, Period } from '@app/statistics/enums';

@Injectable()
export class YearlySpendingQuery implements ISpendingQuery {
  constructor(private readonly em: EntityManager) {}
  async getResults(
    dto: SpendingQueryDto,
    user: User,
  ): Promise<SpendingResultDto> {
    const knex = this.em.getKnex();

    const result = await knex
      .with('monthlyTotals', (qb) => {
        qb.select({ month: knex.raw('extract(month from date)') })
          .sum({ monthlyTotal: 'amount' })
          .from(Transaction.name.toLowerCase())
          .where({
            owner_id: user.id,
          })
          .andWhereRaw('extract(year from date) = ?', [+dto.year])
          .groupByRaw('extract(month from date)');
      })
      .select([
        'month',
        'monthlyTotal',
        {
          yearlyTotal: knex.raw('sum("monthlyTotal") over ()'),
        },
      ])
      .from('monthlyTotals')
      .orderBy('month');

    return this.buildResults(result);
  }

  private buildResults(result: any[]): SpendingResultDto {
    return {
      period: Period.YEARLY,
      total: result[0]?.yearlyTotal,
      granularity: Granularity.MONTH,
      granularResults: result?.map((r) => ({
        period: r.month,
        total: r.monthlyTotal,
      })),
    };
  }
}
