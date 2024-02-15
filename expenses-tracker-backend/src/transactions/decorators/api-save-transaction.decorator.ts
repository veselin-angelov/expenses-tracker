import { applyDecorators, UseInterceptors } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { Api } from '@app/shared/decorators';
import { ApiProtected } from '@app/auth/decorators';
import { Transaction } from '@app/transactions/entities';
import { InjectIdToBodyInterceptor } from '@app/shared/interceptors';

export const ApiSaveTransaction = (edit = false) =>
  applyDecorators(
    Api(),
    ApiProtected(),
    ApiOperation({
      summary: edit ? 'Edit a transaction' : 'Create a transaction',
    }),
    ApiExtraModels(Transaction),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(Transaction),
      },
    }),
    UseInterceptors(InjectIdToBodyInterceptor),
  );
