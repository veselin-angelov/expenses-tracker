import { File } from '@app/files/entities';
import { IFileResponseTransformer } from '@app/files/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileResponseTransformerFactory {
  constructor(private readonly transformers: IFileResponseTransformer[]) {}

  public async transform(file: File): Promise<File> {
    for (const transformer of this.transformers) {
      file = await transformer.apply(file);
    }

    return file;
  }
}
