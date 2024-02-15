import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FileQuery } from '@app/files/queries/file.query';
import { FileRepository } from '@app/files/repositories';
import { FileResponseTransformerFactory } from '@app/files/factories';
import { File } from '@app/files/entities';

@QueryHandler(FileQuery)
export class FileHandler implements IQueryHandler<FileQuery> {
  public constructor(
    private readonly fileRepository: FileRepository,
    private readonly fileResponseTransformer: FileResponseTransformerFactory,
  ) {}

  public async execute({ id, permissionFilters }: FileQuery): Promise<File> {
    const file = await this.fileRepository.findOneOrFail({
      $and: [{ id }, { ...(permissionFilters as any) }],
    });

    return await this.fileResponseTransformer.transform(file);
  }
}
