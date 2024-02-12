import { IQuery } from '@nestjs/cqrs';

export class FileQuery implements IQuery {
  public constructor(public readonly id: string) {}
}
