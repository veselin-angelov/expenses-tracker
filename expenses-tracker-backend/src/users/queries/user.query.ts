import { User } from '@app/users/entities';
import { FilterQuery } from '@mikro-orm/core';
import { IQuery } from '@nestjs/cqrs';

export class UserQuery implements IQuery {
  public constructor(
    public readonly id: string,
    public readonly abilityFilter?: FilterQuery<User>,
  ) {}
}
