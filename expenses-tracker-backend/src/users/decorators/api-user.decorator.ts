import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from '@app/users/entities';
import { Api } from '@app/shared/decorators';
import { ApiProtected } from '@app/auth/decorators';
import { UserAccessGuard } from '@app/users/guards';

export const ApiUser = () =>
  applyDecorators(
    Api(),
    ApiProtected(),
    UseGuards(UserAccessGuard),
    ApiOperation({
      summary: 'Returns a user by id',
    }),
    ApiExtraModels(User),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(User),
      },
    }),
  );
