const { Migration } = require('@mikro-orm/migrations');

module.exports = class Migration20241031085141 extends Migration {
  async up() {
    this.addSql('ALTER TABLE "customer" ADD COLUMN IF NOT EXISTS "approved" boolean NOT NULL DEFAULT false;');
  }

  async down() {
    this.addSql('ALTER TABLE "customer" DROP COLUMN IF EXISTS "approved";');
  }
}