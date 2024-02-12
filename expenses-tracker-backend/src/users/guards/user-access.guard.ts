import { User } from '@app/users/entities';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserAccessGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp();

    const userId = (http.getRequest() as Request).params.id;
    const user = http.getRequest().user as User;

    return user.id === userId;
  }
}
