import { ReflectMetadataProvider } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Environments } from '@app/shared/enums';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export const options: MikroOrmModuleOptions = {
  entities: [process.env.DATABASE_ENTITIES_PATH as string],
  host: process.env.DATABASE_HOST,
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT as string) || 5432,
  autoLoadEntities: true,
  debug: process.env.ENVIRONMENT !== Environments.PRODUCTION,
  metadataProvider: ReflectMetadataProvider,
  multipleStatements: true,
  allowGlobalContext: true,
  // driver: PgsqlCustomDriver,
  driver: PostgreSqlDriver,
  migrations: {
    tableName: 'migrations',
    path: process.env.DATABASE_MIGRATIONS_PATH,
    allOrNothing: true,
    disableForeignKeys: false,
    emit: 'ts',
    transactional: true,
  },
  seeder: {
    path: process.env.DATABASE_SEEDERS_PATH,
    glob: '!(*.d).seeder.{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
  pool: {
    max: 10,
    min: 0,
  },
};

export default options;
