import { ISpendingQuery } from '@app/statistics/interfaces';
import { SpendingQueryDto, SpendingResultDto } from '@app/statistics/dtos';
import { User } from '@app/users/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Granularity, Period } from '@app/statistics/enums';
import { Transaction } from '@app/transactions/entities';

@Injectable()
export class WeeklySpendingQuery implements ISpendingQuery {
  constructor(private readonly em: EntityManager) {}
  async getResults(
    dto: SpendingQueryDto,
    user: User,
  ): Promise<SpendingResultDto> {
    const knex = this.em.getKnex();

    const result = await knex
      .with('dailyTotals', (qb) => {
        qb.select({
          dayOfWeek: knex.raw('EXTRACT(ISODOW FROM date)'),
        })
          .sum({ dailyTotal: 'amount' })
          .from(Transaction.name.toLowerCase())
          .where({
            owner_id: user.id,
          })
          .andWhereRaw('EXTRACT(ISOYEAR FROM date) = ?', [+dto.year])
          .andWhereRaw('EXTRACT(WEEK FROM date) = ?', [+dto.week!])
          .groupByRaw('EXTRACT(ISODOW FROM date)');
      })
      .select([
        'dayOfWeek',
        'dailyTotal',
        {
          weeklyTotal: knex.raw('sum("dailyTotal") over ()'),
        },
      ])
      .from('dailyTotals')
      .orderBy('dayOfWeek');

    return this.buildResults(result);
  }

  private buildResults(result: any[]): SpendingResultDto {
    return {
      period: Period.WEEKLY,
      total: result[0].weeklyTotal,
      granularity: Granularity.DAY_OF_WEEK,
      granularResults: result.map((r) => ({
        period: r.dayOfWeek,
        display: r.dayOfWeek,
        total: r.dailyTotal,
      })),
    };
  }
}
