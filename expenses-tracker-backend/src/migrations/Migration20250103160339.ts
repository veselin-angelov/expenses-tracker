import { Migration } from '@mikro-orm/migrations';

export class Migration20250103160339 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "auth_type" text check ("auth_type" in (\'google\', \'email\')) not null, add column "password" varchar(255) null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "auth_type";');
    this.addSql('alter table "user" drop column "password";');
  }
}
