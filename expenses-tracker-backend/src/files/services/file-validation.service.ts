import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FILE_VALIDATORS } from '@app/files/constants';
import { FileValidator } from '@app/files/types';

@Injectable()
export class FileValidationService {
  public constructor(
    @Inject(FILE_VALIDATORS)
    private readonly fileValidators: () => FileValidator[] | null,
  ) {}

  public async validate(file: Express.Multer.File): Promise<boolean> {
    const validators = this.fileValidators();

    if (!validators) {
      return true;
    }

    const errors = [];

    for (const { validate, errorMessage } of validators) {
      if (await validate(file)) {
        continue;
      }

      errors.push(errorMessage);
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return errors.length === 0;
  }
}
