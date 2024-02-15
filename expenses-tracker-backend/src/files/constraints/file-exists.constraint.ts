import { Injectable } from '@nestjs/common';
import {
  isEmpty,
  isString,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';
import { FileRepository } from '@app/files/repositories';

@ValidatorConstraint({ name: 'fileExists', async: true })
@Injectable()
export class FileExistsConstraint {
  public constructor(private readonly filesRepository: FileRepository) {}

  async validate(value: string) {
    if (!isString(value) || isEmpty(value?.trim())) {
      return true;
    }

    return !!(await this.filesRepository.findOne({
      id: value,
    }));
  }

  public defaultMessage(args: ValidationArguments) {
    return `File with id ${args.value} cannot be found.`;
  }
}
