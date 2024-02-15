import { Migration } from '@mikro-orm/migrations';

export class Migration20240214235135 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);',
    );
    this.addSql(
      'alter table "user" alter column "created_at" set default CURRENT_TIMESTAMP;',
    );

    this.addSql(
      'alter table "file" alter column "created_at" type timestamptz using ("created_at"::timestamptz);',
    );
    this.addSql(
      'alter table "file" alter column "created_at" set default CURRENT_TIMESTAMP;',
    );

    this.addSql(
      'alter table "transaction" alter column "created_at" type timestamptz using ("created_at"::timestamptz);',
    );
    this.addSql(
      'alter table "transaction" alter column "created_at" set default CURRENT_TIMESTAMP;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "created_at" drop default;');
    this.addSql(
      'alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);',
    );

    this.addSql('alter table "file" alter column "created_at" drop default;');
    this.addSql(
      'alter table "file" alter column "created_at" type timestamptz using ("created_at"::timestamptz);',
    );

    this.addSql(
      'alter table "transaction" alter column "created_at" drop default;',
    );
    this.addSql(
      'alter table "transaction" alter column "created_at" type timestamptz using ("created_at"::timestamptz);',
    );
  }
}
