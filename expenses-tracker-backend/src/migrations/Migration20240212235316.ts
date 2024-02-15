import { Migration } from '@mikro-orm/migrations';

export class Migration20240212235316 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "file" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, "bucket" varchar(255) not null, "remote" varchar(255) not null, "file_name" varchar(255) not null, "mime_type" varchar(255) not null, "size" int not null, "extension" varchar(255) not null, "created_by_id" varchar(255) null, constraint "file_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "file_created_at_index" on "file" ("created_at");',
    );
    this.addSql(
      'create index "file_created_by_id_index" on "file" ("created_by_id");',
    );

    this.addSql(
      'alter table "file" add constraint "file_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "file" cascade;');
  }
}
