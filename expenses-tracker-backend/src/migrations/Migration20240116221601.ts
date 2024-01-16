import { Migration } from '@mikro-orm/migrations';

export class Migration20240116221601 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "refresh_token" drop default;',
    );
    this.addSql(
      'alter table "user" alter column "refresh_token" drop not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "refresh_token" set not null;',
    );
    this.addSql(
      'alter table "user" alter column "refresh_token" set default \'dummyRefresh\';',
    );
  }
}
