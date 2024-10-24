import { Migration } from '@mikro-orm/migrations';

export class Migration20241024071458 extends Migration {

  async up(): Promise<void> {
    // Tworzenie tabeli 'document'
    this.addSql(
      `CREATE TABLE IF NOT EXISTS "document" (
        "id" text NOT NULL, 
        "file_name" text NOT NULL, 
        "language" varchar(10) NOT NULL, 
        "document_type" varchar(50) NOT NULL, 
        "product_id" text NOT NULL,  
        "created_at" timestamptz NOT NULL DEFAULT now(), 
        "updated_at" timestamptz NOT NULL DEFAULT now(), 
        "deleted_at" timestamptz NULL, 
        CONSTRAINT "document_pkey" PRIMARY KEY ("id")
      );`
    );

    // Dodanie indeksu do "product_id" (opcjonalnie)
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_document_product_id" ON "document" ("product_id") WHERE deleted_at IS NULL;'
    );

    // Dodanie klucza obcego do tabeli "product" z obsługą błędów
    this.addSql(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                       WHERE table_name='document' AND constraint_name='document_product_id_foreign') THEN
          ALTER TABLE "document" 
          ADD CONSTRAINT "document_product_id_foreign" 
          FOREIGN KEY ("product_id") REFERENCES "product" ("id") 
          ON UPDATE CASCADE ON DELETE CASCADE;
        END IF;
      END $$;
    `);
  }

  async down(): Promise<void> {
    // Usunięcie ograniczeń i tabeli 'document'
    this.addSql(
      'ALTER TABLE IF EXISTS "document" DROP CONSTRAINT IF EXISTS "document_product_id_foreign";'
    );
    this.addSql('DROP TABLE IF EXISTS "document" CASCADE;');
  }
}
