import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { CustomBaseEntity } from '@app/shared/entities';
import { CurrencyEnum } from '../enums';
import { User } from '@app/users/entities';
import { TransactionRepository } from '@app/transactions/repositories';

@Entity({
  repository: () => TransactionRepository,
})
export class Transaction extends CustomBaseEntity {
  @ApiProperty({
    nullable: true,
  })
  @Property({
    nullable: true,
  })
  public merchantName?: string;

  @ApiProperty({
    nullable: true,
  })
  @Property({
    nullable: true,
  })
  public merchantAddress?: string;

  @ApiProperty({
    nullable: false,
  })
  @Property({
    nullable: false,
    defaultRaw: 'now()',
  })
  public date: Date = new Date();

  @ApiProperty({
    nullable: false,
  })
  @Property({
    columnType: 'numeric(10,2)',
  })
  public amount: string;

  @ApiProperty({
    nullable: false,
    enum: CurrencyEnum,
  })
  @Enum({
    items: () => CurrencyEnum,
    nullable: false,
  })
  public currency: CurrencyEnum;

  @ApiProperty({
    nullable: true,
  })
  @Property({ nullable: true })
  public description?: string;

  @ApiProperty({
    nullable: false,
  })
  @ManyToOne({ entity: () => User, nullable: false })
  public owner!: User;
}
