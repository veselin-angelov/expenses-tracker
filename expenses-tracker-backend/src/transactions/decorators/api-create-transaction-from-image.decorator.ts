import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { Api } from '@app/shared/decorators';
import { ApiProtected } from '@app/auth/decorators';
import { Transaction } from '@app/transactions/entities';

export const ApiCreateTransactionFromImage = () =>
  applyDecorators(
    Api(),
    ApiProtected(),
    ApiOperation({
      summary: 'Create a transaction from image',
    }),
    ApiExtraModels(Transaction),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(Transaction),
      },
    }),
  );
