import { Migration } from '@mikro-orm/migrations';

export class Migration20240213185912 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create index "transaction_owner_id_index" on "transaction" ("owner_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop index "transaction_owner_id_index";');
  }
}
