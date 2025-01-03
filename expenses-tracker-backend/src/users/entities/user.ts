import {
  Cascade,
  Collection,
  Entity,
  Enum,
  Hidden,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserRepository } from '@app/users/repositories';
import { CustomBaseEntity } from '@app/shared/entities';
import { Transaction } from '@app/transactions/entities';
import { AuthType } from '@app/shared/enums/auth-type.enum';

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
    hidden: true,
    nullable: true,
  })
  public refreshToken?: string & Hidden;

  @ApiProperty({
    type: 'boolean',
    nullable: false,
  })
  @Property({
    default: true,
  })
  public active: boolean = true;

  @Enum(() => AuthType)
  authType: AuthType;

  @Property({ nullable: true })
  password?: string;

  @ApiHideProperty()
  @OneToMany({
    entity: () => Transaction,
    mappedBy: (transaction: Transaction) => transaction.owner,
    cascade: [Cascade.ALL],
  })
  public transactions = new Collection<Transaction>(this);

  constructor(email: string, authType: AuthType) {
    super();
    this.email = email;
    this.authType = authType;
  }
}
