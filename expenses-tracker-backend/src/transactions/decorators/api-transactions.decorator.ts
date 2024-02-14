import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { Api } from '@app/shared/decorators';
import { ApiProtected } from '@app/auth/decorators';
import { TransactionsResultWithCountDto } from '@app/transactions/dtos';

export const ApiTransactions = () =>
  applyDecorators(
    Api(),
    ApiProtected(),
    // UseGuards(UserAccessGuard),
    ApiOperation({
      summary: 'Returns a list of transactions for a user',
    }),
    ApiExtraModels(TransactionsResultWithCountDto),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(TransactionsResultWithCountDto),
      },
    }),
  );
