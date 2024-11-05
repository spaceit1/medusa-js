import { Migration } from '@mikro-orm/migrations';

export class Migration20241105184528 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "attachment" add column if not exists "type" text check ("type" in (\'document\', \'image\')) not null;');
    this.addSql('alter table if exists "attachment" alter column "language" type text using ("language"::text);');
    this.addSql('alter table if exists "attachment" add constraint "attachment_language_check" check ("language" in (\'pl\', \'en\'));');
    this.addSql('alter table if exists "attachment" drop column if exists "document_type";');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "attachment" drop constraint if exists "attachment_language_check";');

    this.addSql('alter table if exists "attachment" add column if not exists "document_type" text not null;');
    this.addSql('alter table if exists "attachment" alter column "language" type text using ("language"::text);');
    this.addSql('alter table if exists "attachment" drop column if exists "type";');
  }

}
