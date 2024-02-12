import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { UserRepository } from '@app/users/repositories';
import { CustomBaseEntity } from '@app/shared/entities';
import { Transaction } from '@app/transactions/entities/transaction';

@Entity({
  repository: () => UserRepository,
})
export class User extends CustomBaseEntity {
  @ApiProperty({
    nullable: false,
  })
  @Property({
    unique: true,
    index: true,
  })
  public email: string;

  @ApiProperty({
    nullable: true,
  })
  @Property({
    nullable: true,
  })
  public refreshToken?: string;

  @ApiProperty({
    type: 'boolean',
    nullable: false,
  })
  @Property({
    default: true,
  })
  public active: boolean = true;

  @OneToMany({
    entity: () => Transaction,
    mappedBy: 'owner',
    cascade: [Cascade.ALL],
  })
  public transactions = new Collection<Transaction>(this);

  constructor(email: string) {
    super();
    this.email = email;
  }
}
