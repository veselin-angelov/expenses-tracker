import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { File } from '@app/files/entities';
import { Api } from '@app/shared/decorators';
import { ApiProtected } from '@app/auth/decorators';

export const ApiFile = () =>
  applyDecorators(
    Api(),
    ApiProtected(),
    ApiExtraModels(File),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(File),
      },
    }),
    ApiOperation({
      summary: 'Return the file by id',
    }),
  );
