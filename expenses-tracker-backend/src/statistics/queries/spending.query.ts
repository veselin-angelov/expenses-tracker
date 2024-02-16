import { SpendingQueryDto } from '@app/statistics/dtos';
import { User } from '@app/users/entities';

export class SpendingQuery {
  constructor(
    public readonly dto: SpendingQueryDto,
    public readonly user: User,
  ) {}
}
