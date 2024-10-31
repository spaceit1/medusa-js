const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddApprovedToCustomer1698765432123 {
    async up(queryRunner) {
        await queryRunner.query(
            `ALTER TABLE "customer" ADD COLUMN "approved" BOOLEAN NOT NULL DEFAULT false`
        );
    }

    async down(queryRunner) {
        await queryRunner.query(
            `ALTER TABLE "customer" DROP COLUMN "approved"`
        );
    }
}