import { Migration } from "@mikro-orm/migrations";

export class Migration20241031090918 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'ALTER TABLE "customer" ADD COLUMN IF NOT EXISTS "approved" boolean NOT NULL DEFAULT false;'
    );
  }

  async down(): Promise<void> {
    this.addSql(
     'ALTER TABLE "customer" DROP COLUMN IF EXISTS "approved";'
    );
  }
}