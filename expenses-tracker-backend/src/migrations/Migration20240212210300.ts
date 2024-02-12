import { Migration } from '@mikro-orm/migrations';

export class Migration20240212210300 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "transaction" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, "merchant_name" varchar(255) null, "merchant_address" varchar(255) null, "date" timestamptz not null default now(), "amount" int not null, "currency" smallint not null, "description" varchar(255) null, "owner_id" varchar(255) not null, constraint "transaction_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "transaction_created_at_index" on "transaction" ("created_at");',
    );

    this.addSql(
      'alter table "transaction" add constraint "transaction_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "user" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "transaction" cascade;');

    this.addSql(
      'alter table "user" alter column "updated_at" type varchar(255) using ("updated_at"::varchar(255));',
    );
  }
}
