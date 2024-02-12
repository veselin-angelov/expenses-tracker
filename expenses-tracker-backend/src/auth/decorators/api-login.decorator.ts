import { Api } from '@app/shared/decorators';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '@app/auth/decorators/public.decorator';

export const ApiLogin = () =>
  applyDecorators(
    Api(),
    ApiOperation({
      summary: 'Authorize the user to access the application',
    }),
    Public(),
  );
