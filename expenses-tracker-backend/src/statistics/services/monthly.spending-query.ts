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
          weekOfMonth: knex.raw(`CASE
                WHEN extract(DAY from date) <= 7 THEN 1
                WHEN extract(DAY from date) <= 14 THEN 2
                WHEN extract(DAY from date) <= 21 THEN 3
                WHEN extract(DAY from date) <= 28 THEN 4
                ELSE 5
            END`),
          displayValue: knex.raw(`CASE 
                WHEN extract(DAY from date) <= 28 THEN
                    ((extract(DAY from date)::integer - 1) / 7) * 7 + 1 || '-' ||
                    LEAST(((extract(DAY from date)::integer - 1) / 7) * 7 + 7, 28)
                ELSE
                    '29-' ||
                    extract(DAY from (DATE_TRUNC('MONTH', date) + INTERVAL '1 MONTH - 1 day'))::text
                END`),
        })
          .sum({ weeklyTotal: 'amount' })
          .from(Transaction.name.toLowerCase())
          .where({ owner_id: user.id })
          .andWhereRaw('EXTRACT(MONTH FROM date) = ?', [+dto.month!])
          .andWhereRaw('EXTRACT(YEAR FROM date) = ?', [+dto.year])
          .groupBy('weekOfMonth', 'displayValue');
      })
      .select([
        'weekOfMonth',
        'displayValue',
        'weeklyTotal',
        { monthlyTotal: knex.raw('sum("weeklyTotal") over ()') },
      ])
      .from('weeklyTotals')
      .orderBy('weekOfMonth');

    return this.buildResults(result);
  }

  private buildResults(result: any[] | null): SpendingResultDto {
    if (!result || result.length === 0) {
      return {
        period: Period.MONTHLY,
        total: 0,
        granularity: Granularity.WEEK,
        granularResults: [],
      };
    }

    return {
      period: Period.MONTHLY,
      total: result[0].monthlyTotal,
      granularity: Granularity.WEEK,
      granularResults: result.map((r) => ({
        period: r.weekOfMonth,
        display: r.displayValue,
        total: r.weeklyTotal,
      })),
    };
  }
}
