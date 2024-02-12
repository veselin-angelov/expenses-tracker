import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  app,
  AWS_S3_CONFIG_KEY,
  awsS3,
  AwsS3Config,
  database,
  jwt,
  logger,
} from '@app/config';
import { DatabaseModule } from '@app/shared/database/database.module';
import { LoggerModule } from '@app/shared/logger/logger.module';
import { S3Module } from '@lab08/nestjs-s3';

@Global()
@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: [database, app, logger, jwt, awsS3],
      envFilePath: `.env`,
    }),
    DatabaseModule,
    LoggerModule,
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const { prefix, accessKey, secretKey, region } =
          config.get<AwsS3Config>(AWS_S3_CONFIG_KEY)!;

        return {
          prefix,
          accessKeyId: accessKey,
          secretAccessKey: secretKey,
          region,
        };
      },
    }),
  ],
  exports: [ConfigModule, DatabaseModule, LoggerModule],
})
export class SharedModule {}
