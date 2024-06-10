import { FactoryProvider, Module } from '@nestjs/common';
import {
  utilities,
  WINSTON_MODULE_NEST_PROVIDER,
  WinstonModule,
} from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  APP_CONFIG_KEY,
  AppConfig,
  LOGGER_CONFIG_KEY,
  LoggerConfig,
} from '@app/config';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { LOGGER } from '@app/shared/logger/constants';

const sharedProviders: FactoryProvider[] = [
  {
    provide: LOGGER,
    inject: [WINSTON_MODULE_NEST_PROVIDER],
    useFactory: (logger) => logger,
  },
];

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { name } = configService.get<AppConfig>(APP_CONFIG_KEY)!;

        const loggerConfig =
          configService.get<LoggerConfig>(LOGGER_CONFIG_KEY)!;

        return {
          transports: [
            new winston.transports.DailyRotateFile({
              ...loggerConfig,
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.logstash(),
              ),
              filename: 'errors-logstash-%DATE%.json',
              level: 'error',
            }),
            new winston.transports.DailyRotateFile({
              ...loggerConfig,
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.logstash(),
              ),
              filename: 'app-logstash-%DATE%.json',
              level: 'verbose',
            }),
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike(name),
              ),
              silent: loggerConfig.silent,
              level: 'verbose',
            }),
          ],
        };
      },
    }),
  ],
  providers: sharedProviders,
  exports: sharedProviders,
})
export class LoggerModule {}
