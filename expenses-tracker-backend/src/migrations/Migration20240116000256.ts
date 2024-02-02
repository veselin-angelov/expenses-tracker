import { Migration } from '@mikro-orm/migrations';

export class Migration20240116000256 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "username" type varchar(255) using ("username"::varchar(255));',
    );
    this.addSql('alter table "user" alter column "username" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "username" type varchar(255) using ("username"::varchar(255));',
    );
    this.addSql('alter table "user" alter column "username" set not null;');
  }
}
