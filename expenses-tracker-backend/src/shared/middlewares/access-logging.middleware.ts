import { LOGGER } from '@app/shared/logger/constants';
import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AccessLoggingMiddleware implements NestMiddleware {
  constructor(@Inject(LOGGER) private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, httpVersion, socket } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;

      const remoteAddr =
        socket.remoteAddress ||
        (req.headers['x-forwarded-for']
          ? (req.headers['x-forwarded-for'] as string).split(/\s*,\s*/)[0]
          : '');

      this.logger.verbose(
        `${remoteAddr} - "${method} ${decodeURI(
          originalUrl,
        )} HTTP/${httpVersion}" ${statusCode} - ${userAgent}`,
      );
    });

    next();
  }
}
