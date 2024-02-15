import {
  applyDecorators,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export const Api = () =>
  applyDecorators(
    UsePipes(
      new ValidationPipe({
        stopAtFirstError: true,
        transform: true,
        whitelist: true,
        transformOptions: {
          exposeUnsetFields: false,
          enableCircularCheck: true,
        },
        exceptionFactory: (errors) => {
          return new HttpErrorByCode[HttpStatus.BAD_REQUEST](errors);
        },
      }),
    ),
  );
