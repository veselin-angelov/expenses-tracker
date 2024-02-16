import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Api } from '@app/shared/decorators';
import { ApiProtected } from '@app/auth/decorators';

export const ApiSpending = () =>
  applyDecorators(
    Api(),
    ApiProtected(),
    ApiOperation({
      summary: 'Returns statistics for a user spending.',
    }),
    // ApiExtraModels(Spending),
    // ApiOkResponse({
    //   schema: {
    //     $ref: getSchemaPath(Spending),
    //   },
    // }),
  );
