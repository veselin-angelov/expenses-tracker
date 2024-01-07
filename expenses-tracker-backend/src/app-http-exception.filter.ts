import { ArgumentsHost, HttpServer, Inject, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express';
import { omit } from 'lodash';
import { exceptionsMap, LOGGER } from '@app/shared/logger/constants';
import { User } from '@app/users/entities';
import { instanceToPlain } from 'class-transformer';

const sanitizePasswords = (
  object: Record<string, any>,
): Record<string, any> => {
  return Object.keys(object).reduce((a, k) => {
    if (['pass', 'password', 'access', 'token'].includes(k)) {
      a[k] = '***********';
    }

    if (Array.isArray(a[k])) {
      a[k] = sanitizePasswords(a[k]);
    }

    return a;
  }, object);
};

export class AppHttpExceptionFilter extends BaseExceptionFilter {
  public constructor(
    @Inject(LOGGER) private readonly logger: Logger,
    public readonly applicationRef?: HttpServer,
  ) {
    super(applicationRef);
  }

  public catch(exception: Error, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();

    const user: Partial<User> | null =
      'user' in request ? (request.user as User) : null;

    const context = JSON.stringify({
      user: user
        ? omit(instanceToPlain(user, { enableCircularCheck: true }), [
            'password',
          ])
        : null,
      route: request?.route?.path,
      params: request?.params,
      body: sanitizePasswords(request?.body),
      query: request?.query,
    });

    if (exceptionsMap.has(exception.constructor.name)) {
      exception = exceptionsMap.get(exception.constructor.name)!(exception);
    }

    this.logger.error(exception.message, exception?.stack, context);

    super.catch(exception, host);
  }
}
