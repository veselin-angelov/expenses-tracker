import {
  Entity,
  Enum,
  LoadStrategy,
  ManyToOne,
  Property,
  Ref,
  Reference,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { CustomBaseEntity } from '@app/shared/entities';
import { User } from '@app/users/entities';
import { TransactionRepository } from '@app/transactions/repositories';
import { Currency } from '@app/transactions/enums';
import { File } from '@app/files/entities';

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
    defaultRaw: 'CURRENT_TIMESTAMP',
    index: true,
  })
  public date: Date = new Date();

  @ApiProperty({
    nullable: false,
  })
  @Property({
    columnType: 'numeric(10,2)',
    index: true,
  })
  public amount: string;

  @ApiProperty({
    nullable: false,
    enum: Currency,
  })
  @Enum({
    items: () => Currency,
    nullable: false,
  })
  public currency: Currency;

  @ApiProperty({
    nullable: true,
  })
  @Property({ nullable: true })
  public description?: string;

  @ApiProperty({
    nullable: false,
  })
  @ManyToOne({
    entity: () => User,
    strategy: LoadStrategy.JOINED,
    ref: true,
    index: true,
    nullable: false,
  })
  public owner: Ref<User>;

  @ApiProperty({
    nullable: false,
  })
  @ManyToOne({
    entity: () => File,
    strategy: LoadStrategy.JOINED,
    ref: true,
    index: true,
    nullable: true,
  })
  public receipt?: Ref<File>;

  public getOwner(): Promise<User | null> {
    return this.owner?.load();
  }

  public setOwner(user: User): void {
    this.owner = Reference.create(user);
  }
}
