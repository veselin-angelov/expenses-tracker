import { IQuery } from '@nestjs/cqrs';
import { FilterQuery } from '@mikro-orm/core';
import { File } from '@app/files/entities';

export class FileQuery implements IQuery {
  public constructor(
    public readonly id: string,
    public readonly permissionFilters: FilterQuery<File>,
  ) {}
}
