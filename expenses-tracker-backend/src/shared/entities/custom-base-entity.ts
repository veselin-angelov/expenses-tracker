import {
  BaseEntity,
  Config,
  DateTimeType,
  DefineConfig,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export abstract class CustomBaseEntity extends BaseEntity {
  [Config]?: DefineConfig<{ forceObject: true }>;

  @ApiProperty({
    nullable: false,
    readOnly: true,
  })
  @PrimaryKey()
  public id: string = v4();

  @ApiProperty()
  @Property({
    defaultRaw: 'CURRENT_TIMESTAMP',
    onCreate: () => new Date(),
    index: true,
    type: DateTimeType,
  })
  public createdAt: Date;

  @ApiProperty()
  @Property({
    onUpdate: () => new Date(),
    nullable: true,
    type: DateTimeType,
  })
  public updatedAt?: Date;
}
