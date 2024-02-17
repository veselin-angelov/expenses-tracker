import { ISpendingQuery } from '@app/statistics/interfaces';
import { SpendingQueryDto, SpendingResultDto } from '@app/statistics/dtos';
import { User } from '@app/users/entities';
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
      .with('months', (qb) => {
        qb.select(knex.raw('generate_series(1,12) as "month"'));
      })
      .with('monthlyTotals', (qb) => {
        qb.select({
          month: knex.raw('COALESCE(extract(month from date)::int, m."month")'),
          displayValue:
            knex.raw(`COALESCE(CASE COALESCE(extract(month from date)::int, m."month")
        WHEN 1 THEN 'J'
        WHEN 2 THEN 'F'
        WHEN 3 THEN 'M'
        WHEN 4 THEN 'A'
        WHEN 5 THEN 'M'
        WHEN 6 THEN 'J'
        WHEN 7 THEN 'J'
        WHEN 8 THEN 'A'
        WHEN 9 THEN 'S'
        WHEN 10 THEN 'O'
        WHEN 11 THEN 'N'
        WHEN 12 THEN 'D'
        ELSE 'Unknown'
      END, 'N/A')`),
          monthlyTotal: knex.raw('COALESCE(SUM(amount), 0)'),
        })
          .from('months as m')
          .leftJoin('public.transaction as t', function () {
            this.on('m.month', '=', knex.raw('extract(month from t.date)'))
              .andOn(knex.raw('owner_id = ?', [user.id]))
              .andOn(knex.raw('extract(year from date) = ?', [+dto.year]));
          })
          .groupBy('m.month', knex.raw('extract(month from t.date)'));
      })
      .select([
        'month',
        'displayValue',
        'monthlyTotal',
        { yearlyTotal: knex.raw('SUM("monthlyTotal") OVER ()') },
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
        display: r.displayValue,
        total: r.monthlyTotal,
      })),
    };
  }
}
