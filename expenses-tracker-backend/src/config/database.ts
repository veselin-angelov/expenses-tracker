import { MikroORMOptions } from '@mikro-orm/core';

export const DATABASE_CONFIG_KEY = 'database';
export type DatabaseConfig = MikroORMOptions;

export const database = (): {
  [DATABASE_CONFIG_KEY]: Partial<DatabaseConfig>;
} => ({
  [DATABASE_CONFIG_KEY]: {
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,
  },
});
