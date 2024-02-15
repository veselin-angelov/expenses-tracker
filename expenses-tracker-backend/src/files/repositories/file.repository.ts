import { EntityRepository } from '@mikro-orm/core';
import { File } from '@app/files/entities/file';

export class FileRepository extends EntityRepository<File> {}
