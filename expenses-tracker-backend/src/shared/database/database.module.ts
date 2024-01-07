import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  APP_CONFIG_KEY,
  AppConfig,
  DATABASE_CONFIG_KEY,
  DatabaseConfig,
  options,
} from '@app/config';
import { Environments } from '@app/shared/enums';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host, user, port, password, dbName } =
          configService.get<DatabaseConfig>(DATABASE_CONFIG_KEY)!;

        const { environment } = configService.get<AppConfig>(APP_CONFIG_KEY)!;

        return {
          ...options,
          user,
          host,
          port,
          password,
          dbName,
          debug: environment !== Environments.PRODUCTION,
          entities: [],
          discovery: {
            requireEntitiesArray: true,
            warnWhenNoEntities: false,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
