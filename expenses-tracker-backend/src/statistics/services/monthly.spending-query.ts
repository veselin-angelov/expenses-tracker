import { ISpendingQuery } from '@app/statistics/interfaces';
import { SpendingQueryDto, SpendingResultDto } from '@app/statistics/dtos';
import { User } from '@app/users/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Granularity, Period } from '@app/statistics/enums';
import { Transaction } from '@app/transactions/entities';

@Injectable()
export class MonthlySpendingQuery implements ISpendingQuery {
  constructor(private readonly em: EntityManager) {}
  async getResults(
    dto: SpendingQueryDto,
    user: User,
  ): Promise<SpendingResultDto> {
    const knex = this.em.getKnex();

    const result = await knex
      .with('weeklyTotals', (qb) => {
        qb.select({
          weekRange: knex.raw(`CASE
                WHEN extract(DAY from date) <= 28 THEN
                    ((extract(DAY from date)::integer - 1) / 7) * 7 + 1 || '-' ||
                    LEAST((extract(DAY from date)::integer - 1) + 7, 28)
                ELSE
                    '29-' ||
                    extract(DAY from (DATE_TRUNC('MONTH', date) + INTERVAL '1 MONTH - 1 day'))::text
                END`),
        })
          .sum({ weeklyTotal: 'amount' })
          .from(Transaction.name.toLowerCase())
          .where({
            owner_id: user.id,
          })
          .andWhereRaw('EXTRACT(MONTH FROM date) = ?', [+dto.month!])
          .andWhereRaw('EXTRACT(YEAR FROM date) = ?', [+dto.year])
          .groupBy('weekRange');
      })
      .select([
        'weekRange',
        'weeklyTotal',
        {
          monthlyTotal: knex.raw('sum("weeklyTotal") over ()'),
        },
      ])
      .from('weeklyTotals')
      .orderBy('weekRange');

    return this.buildResults(result);
  }

  private buildResults(result: any[]): SpendingResultDto {
    return {
      period: Period.MONTHLY,
      total: result[0].monthlyTotal,
      granularity: Granularity.WEEK,
      granularResults: result.map((r) => ({
        period: r.weekRange,
        total: r.weeklyTotal,
      })),
    };
  }
}
