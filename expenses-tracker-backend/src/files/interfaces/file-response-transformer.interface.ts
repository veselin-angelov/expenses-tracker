import { File } from '@app/files/entities';

export interface IFileResponseTransformer {
  apply(file: File): Promise<File>;
}
