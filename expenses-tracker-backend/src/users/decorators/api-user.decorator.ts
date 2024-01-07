import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from '@app/users/entities';

export const ApiUser = () =>
  applyDecorators(
    // Api(),
    // ApiProtected((ability) => ability.can(Actions.READ, Subjects.USERS)),
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
