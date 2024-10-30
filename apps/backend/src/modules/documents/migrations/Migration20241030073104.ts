import { Migration } from '@mikro-orm/migrations';

export class Migration20241030073104 extends Migration {


  
  async up(): Promise<void> {
    // Tworzenie tabeli 'document'
    this.addSql(
      `CREATE TABLE IF NOT EXISTS public.document
      (
          id SERIAL PRIMARY KEY,  
          product_id text NOT NULL,
          CONSTRAINT document_product_id_foreign FOREIGN KEY (product_id)
              REFERENCES public.product (id)
              ON UPDATE CASCADE
              ON DELETE CASCADE
      );`
    );

    // Dodanie indeksu do "product_id" (opcjonalnie)

    // Tworzenie tabeli 'file'
    this.addSql(
      `CREATE TABLE IF NOT EXISTS public.file
      (
          file_id SERIAL PRIMARY KEY,
          file_name text NOT NULL,
          language character varying(10) NOT NULL,
          document_type character varying(50) NOT NULL,
          created_at timestamp with time zone DEFAULT now()
      );`
    );

    // Tworzenie tabeli pośredniej 'document_file'
    this.addSql(
      `CREATE TABLE IF NOT EXISTS public.document_file
      (
          document_id INT NOT NULL,
          file_id INT NOT NULL,
          PRIMARY KEY (document_id, file_id),
          CONSTRAINT document_file_document_id_foreign FOREIGN KEY (document_id)
              REFERENCES public.document (id)
              ON DELETE CASCADE,
          CONSTRAINT document_file_file_id_foreign FOREIGN KEY (file_id)
              REFERENCES public.file (file_id)
              ON DELETE CASCADE
      );`
    );
  }

  async down(): Promise<void> {
    // Usunięcie tabeli pośredniej 'document_file'
    this.addSql('DROP TABLE IF EXISTS "document_file" CASCADE;');

    // Usunięcie tabeli 'file'
    this.addSql('DROP TABLE IF EXISTS "file" CASCADE;');

    // Usunięcie ograniczeń i tabeli 'document'
    this.addSql(
      'ALTER TABLE IF EXISTS "document" DROP CONSTRAINT IF EXISTS "document_product_id_foreign";'
    );
    this.addSql('DROP TABLE IF EXISTS "document" CASCADE;');
  }
}
