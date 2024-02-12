import { Api } from '@app/shared/decorators';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RefreshTokenGuard } from '@app/auth/guards';

export const ApiRefreshToken = () =>
  applyDecorators(
    Api(),
    UseGuards(RefreshTokenGuard),
    ApiOperation({
      summary: 'Exchanges the refresh token for a new valid token',
      description:
        'Returns an access token and refresh token, when valid refresh token is given',
    }),
  );
