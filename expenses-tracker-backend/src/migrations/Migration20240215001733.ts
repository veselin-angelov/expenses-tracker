import { Migration } from '@mikro-orm/migrations';

export class Migration20240215001733 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create index "transaction_date_index" on "transaction" ("date");',
    );
    this.addSql(
      'create index "transaction_amount_index" on "transaction" ("amount");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop index "transaction_date_index";');
    this.addSql('drop index "transaction_amount_index";');
  }
}
