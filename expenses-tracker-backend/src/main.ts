import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { createSwaggerConfig } from '@app/config';
import { LOGGER } from '@app/shared/logger/constants';
import { AppHttpExceptionFilter } from '@app/app-http-exception.filter';
import { useContainer } from 'class-validator';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(LOGGER);
  app.useLogger(logger);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AppHttpExceptionFilter(logger, httpAdapter));

  app.enableShutdownHooks();
  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  createSwaggerConfig(app);

  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
