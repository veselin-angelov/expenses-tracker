import {
  Entity,
  LoadStrategy,
  ManyToOne,
  Property,
  Ref,
  Reference,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { FileRepository } from '@app/files/repositories';
import { User } from '@app/users/entities';
import { CustomBaseEntity } from '@app/shared/entities';

@Entity({
  repository: () => FileRepository,
})
export class File extends CustomBaseEntity {
  @ApiProperty({
    nullable: false,
  })
  @Property()
  public bucket!: string;

  @ApiProperty({
    nullable: false,
  })
  @Property()
  public remote!: string;

  @ApiProperty({
    nullable: false,
  })
  @Property()
  public fileName!: string;

  @ApiProperty({
    nullable: false,
  })
  @Property()
  public mimeType!: string;

  @ApiProperty({
    nullable: false,
  })
  @Property()
  public size!: number;

  @ApiProperty({
    nullable: false,
  })
  @Property()
  public extension!: string;

  @ApiProperty({
    nullable: true,
    readOnly: true,
    description: 'The user who uploaded the file.',
  })
  // @ReferenceToEntity()
  @ManyToOne({
    entity: () => User,
    index: true,
    ref: true,
    strategy: LoadStrategy.JOINED,
    nullable: true,
    deleteRule: 'set null',
  })
  public createdBy: Ref<User> | null;

  @ApiProperty({
    readOnly: true,
  })
  @Property({
    persist: false,
  })
  public signedUrl?: string | null = null;

  public setCreatedBy(user: User): void {
    this.createdBy = Reference.create(user);
  }

  public async getCreatedBy(): Promise<User | null> {
    if (!this.createdBy) {
      return null;
    }

    return await this.createdBy.load();
  }
}
