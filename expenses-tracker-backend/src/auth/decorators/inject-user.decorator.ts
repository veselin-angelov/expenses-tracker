import { User } from '@app/users/entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | null => {
    const { user } = ctx.switchToHttp().getRequest();

    if (!user) {
      return null;
    }

    return user;
  },
);
