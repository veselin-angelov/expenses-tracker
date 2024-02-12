import { version } from '@app/package-json';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME as string)
    .setDescription(`This is the ${process.env.APP_NAME} API.`)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: process.env.APP_NAME,
  });
};
