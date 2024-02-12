import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { File } from '../entities';
import { Api } from '@app/shared/decorators';
import { ApiProtected } from '@app/auth/decorators';

export const ApiSaveFile = () =>
  applyDecorators(
    Api(),
    ApiProtected(),
    ApiExtraModels(File),
    ApiCreatedResponse({
      schema: {
        $ref: getSchemaPath(File),
      },
    }),
    UseInterceptors(FileInterceptor('file')),
    ApiOperation({
      summary: 'Creates a new file and import it to s3',
    }),
  );
