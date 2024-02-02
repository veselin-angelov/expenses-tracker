import { Migration } from '@mikro-orm/migrations';

export class Migration20240115175246 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "refresh_token" varchar(255) not null;',
    );

    this.addSql('alter table "user" drop column "password";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "refresh_token";');
    this.addSql(
      'alter table "user" add column "password" varchar(255) not null,',
    );
  }
}
