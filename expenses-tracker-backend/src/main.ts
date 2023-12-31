import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { createSwaggerConfig } from '@app/config';
import { LOGGER } from '@app/shared/logger/constants';
import { AppHttpExceptionFilter } from '@app/app-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LOGGER);
  app.useLogger(logger);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AppHttpExceptionFilter(logger, httpAdapter));

  app.enableShutdownHooks();
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  createSwaggerConfig(app);

  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
