import { Api } from '@app/shared/decorators';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiProtected } from '@app/auth/decorators/api-protected.decorator';

export const ApiLogout = () =>
  applyDecorators(
    Api(),
    ApiProtected(),
    ApiOperation({
      summary: 'Logs out the user from the application',
    }),
  );
