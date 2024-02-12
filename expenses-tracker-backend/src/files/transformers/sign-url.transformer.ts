import { File } from '@app/files/entities';
import { IFileResponseTransformer } from '@app/files/interfaces';
import { Injectable } from '@nestjs/common';
import { SignedUrlService } from '@lab08/nestjs-s3';

@Injectable()
export class SignUrlTransformer implements IFileResponseTransformer {
  constructor(private readonly signedUrlService: SignedUrlService) {}

  public async apply(file: File): Promise<File> {
    file.signedUrl = await this.signedUrlService.getSignedUrl(
      file.bucket,
      file.remote,
    );

    return file;
  }
}
