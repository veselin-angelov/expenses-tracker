import {
  DriverException,
  NotFoundError,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export const LOGGER = Symbol('LOGGER');

export const exceptionsMap = new Map<string, (error: Error) => Error>();

const uniqueConstraintsMap: Record<string, string> = {};

exceptionsMap.set(
  NotFoundError.name,
  (exception: Error) =>
    new NotFoundException(exception.message ?? 'Not Found', {
      cause: exception,
    }),
);

exceptionsMap.set(
  UniqueConstraintViolationException.name,
  (exception: UniqueConstraintViolationException) => {
    if (!('constraint' in exception)) {
      return new ConflictException('Conflict', {
        cause: exception,
      });
    }

    const constraint = exception['constraint'] as string;

    return new ConflictException(
      uniqueConstraintsMap[constraint] ?? 'Conflict',
      {
        cause: exception,
      },
    );
  },
);

exceptionsMap.set(DriverException.name, (exception: DriverException) => {
  return new BadRequestException('Bad Request', {
    description:
      'There is an error in your query or you are trying to query a non-existent property.',
    cause: exception,
  });
});
