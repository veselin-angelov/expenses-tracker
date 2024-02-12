import { AccessTokenGuard } from '@app/auth/guards';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const ApiProtected = () =>
  applyDecorators(UseGuards(AccessTokenGuard), ApiBearerAuth());
