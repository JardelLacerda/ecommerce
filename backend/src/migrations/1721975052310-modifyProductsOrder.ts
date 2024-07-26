import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyProductsOrder1721975052310 implements MigrationInterface {
    name = 'ModifyProductsOrder1721975052310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_products" RENAME COLUMN "price" TO "quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_products" RENAME COLUMN "quantity" TO "price"`);
    }

}
