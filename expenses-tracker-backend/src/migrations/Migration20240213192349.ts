import { Migration } from '@mikro-orm/migrations';

export class Migration20240213192349 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" add column "receipt_id" varchar(255) null;',
    );
    this.addSql(
      'alter table "transaction" add constraint "transaction_receipt_id_foreign" foreign key ("receipt_id") references "file" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'create index "transaction_receipt_id_index" on "transaction" ("receipt_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint "transaction_receipt_id_foreign";',
    );

    this.addSql('drop index "transaction_receipt_id_index";');
    this.addSql('alter table "transaction" drop column "receipt_id";');
  }
}
