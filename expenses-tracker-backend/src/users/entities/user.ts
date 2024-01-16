import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
// import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import { UserRepository } from '@app/users/repositories';

@Entity({
  repository: () => UserRepository,
})
export class User {
  @PrimaryKey({
    type: 'uuid',
    fieldName: 'id',
  })
  public id: string = v4();

  @ApiProperty({
    nullable: false,
  })
  @Unique()
  @Property({
    nullable: true,
  })
  public username?: string;

  @ApiProperty({
    nullable: false,
  })
  @Property()
  public email: string;

  @ApiProperty({
    nullable: true,
  })
  @Property()
  public refreshToken?: string;

  @ApiProperty({
    nullable: false,
  })
  @Property({
    onCreate: () => new Date(),
    index: true,
  })
  public created!: Date;

  @ApiProperty({
    nullable: true,
  })
  @Property({
    onUpdate: () => new Date(),
    nullable: true,
  })
  public updated?: Date | null = null;

  @ApiProperty({
    type: 'boolean',
    nullable: false,
  })
  @Property({
    default: true,
    columnType: 'boolean',
    type: 'boolean',
  })
  public active = true;

  @ApiProperty({
    nullable: true,
  })
  @Property({
    nullable: true,
  })
  public firstName?: string;

  @ApiProperty({
    nullable: true,
  })
  @Property({
    nullable: true,
  })
  public lastName?: string;

  constructor(email: string) {
    this.email = email;
    this.refreshToken = 'dummyRefresh';
  }
}
