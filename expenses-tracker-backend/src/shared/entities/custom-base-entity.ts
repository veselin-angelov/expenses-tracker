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
    type: 'uuid',
  })
  @PrimaryKey()
  public id: string = v4();

  @ApiProperty()
  @Property({
    onCreate: () => new Date(),
    index: true,
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
