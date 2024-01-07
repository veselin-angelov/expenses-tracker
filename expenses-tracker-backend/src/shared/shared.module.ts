import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { app, database, logger } from '@app/config';
import { DatabaseModule } from '@app/shared/database/database.module';
import { LoggerModule } from '@app/shared/logger/logger.module';

@Global()
@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: [database, app, logger],
      envFilePath: `.env`,
    }),
    DatabaseModule,
    LoggerModule,
  ],
  exports: [ConfigModule, DatabaseModule, LoggerModule],
})
export class SharedModule {}
