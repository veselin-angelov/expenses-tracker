import { Migration } from '@mikro-orm/migrations';

export class Migration20240107122557 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" uuid not null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created" timestamptz(0) not null, "updated" varchar(255) null, "active" boolean not null default true, "first_name" varchar(255) null, "last_name" varchar(255) null, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );
    this.addSql('create index "user_created_index" on "user" ("created");');
  }
}
