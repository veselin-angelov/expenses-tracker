import * as prettyBytes from 'pretty-bytes';
import { FileValidator } from '@app/files/types';

export const isValidSize = (requiredSize: number): FileValidator => ({
  validate: (file: Express.Multer.File) => {
    return file.size <= requiredSize;
  },
  errorMessage: `File size must be less than ${prettyBytes(requiredSize)}`,
});

export const isValidMimeType = (
  mimeType: string[],
  customErrorMessage?: string,
): FileValidator => ({
  validate: (file: Express.Multer.File) => {
    return mimeType.includes(file.mimetype);
  },
  errorMessage:
    customErrorMessage ?? `File must be of type ${mimeType.join(', ')}`,
});
