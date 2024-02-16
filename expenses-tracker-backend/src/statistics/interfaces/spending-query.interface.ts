import { SpendingQueryDto, SpendingResultDto } from '@app/statistics/dtos';
import { User } from '@app/users/entities';

export interface ISpendingQuery {
  getResults(dto: SpendingQueryDto, user: User): Promise<SpendingResultDto>;
}
