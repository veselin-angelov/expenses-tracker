import { Migration } from '@mikro-orm/migrations';

export class Migration20240212211325 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" alter column "amount" type numeric(10,2) using ("amount"::numeric(10,2));',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" alter column "amount" type integer using ("amount"::integer);',
    );
  }
}
