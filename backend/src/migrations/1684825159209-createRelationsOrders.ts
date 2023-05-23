import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationsOrders1684825159209 implements MigrationInterface {
    name = 'CreateRelationsOrders1684825159209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_8624dad595ae567818ad9983b33" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_d7b6b269e131a5287bd05da4a51"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8624dad595ae567818ad9983b33"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "productId"`);
    }

}
