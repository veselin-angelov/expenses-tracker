import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsersResultWithCountDto } from '@app/users/dtos';

export const ApiUsers = () =>
  applyDecorators(
    // Api(),
    // ApiProtected((ability) => ability.can(Actions.READ, Subjects.USERS)),
    ApiOperation({
      summary: 'Returns a lists of users',
    }),
    ApiExtraModels(UsersResultWithCountDto),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(UsersResultWithCountDto),
      },
    }),
  );
