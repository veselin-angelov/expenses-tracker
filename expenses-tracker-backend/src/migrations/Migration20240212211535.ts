import { Migration } from '@mikro-orm/migrations';

export class Migration20240212211535 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint if exists "transaction_currency_check";',
    );

    this.addSql(
      'alter table "transaction" alter column "currency" type text using ("currency"::text);',
    );
    this.addSql(
      "alter table \"transaction\" add constraint \"transaction_currency_check\" check (\"currency\" in ('BGN', 'EUR', 'USD', 'GBP'));",
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint if exists "transaction_currency_check";',
    );

    this.addSql(
      'alter table "transaction" alter column "currency" type smallint using ("currency"::smallint);',
    );
  }
}
