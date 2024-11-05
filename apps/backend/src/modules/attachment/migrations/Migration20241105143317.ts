import { Migration } from '@mikro-orm/migrations';

export class Migration20241105143317 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "attachment" ("id" text not null, "name" text not null, "file_name" text not null, "language" text not null, "document_type" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "attachment_pkey" primary key ("id"));');

    this.addSql('create table if not exists "attachment_to_product" ("id" text not null, "attachment_id" text not null, "product_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "attachment_to_product_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "attachment" cascade;');

    this.addSql('drop table if exists "attachment_to_product" cascade;');
  }

}
