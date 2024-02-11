import { Migration } from '@mikro-orm/migrations';

export class Migration20240211154811 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "refresh_token" varchar(255) null, "active" boolean not null default true, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql('create index "user_email_index" on "user" ("email");');
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );
  }
}
