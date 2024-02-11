import { Migration } from '@mikro-orm/migrations';

export class Migration20240211155915 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "created_at" timestamptz not null, add column "updated_at" varchar(255) null;',
    );
    this.addSql(
      'create index "user_created_at_index" on "user" ("created_at");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop index "user_created_at_index";');
    this.addSql('alter table "user" drop column "created_at";');
    this.addSql('alter table "user" drop column "updated_at";');
  }
}
