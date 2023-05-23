import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationsProducts1684824925821 implements MigrationInterface {
    name = 'CreateRelationsProducts1684824925821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalPrice" numeric(12,2) NOT NULL, "quantity" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid, "storeId" uuid, CONSTRAINT "PK_2b42017b5d7c8bc0a2320a7295c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "FK_8f1e0ae4098735afa060ce6fb27" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_products" ADD CONSTRAINT "FK_d4c7d45afdd5e17611ee80cc774" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_products" DROP CONSTRAINT "FK_d4c7d45afdd5e17611ee80cc774"`);
        await queryRunner.query(`ALTER TABLE "store_products" DROP CONSTRAINT "FK_8f1e0ae4098735afa060ce6fb27"`);
        await queryRunner.query(`DROP TABLE "store_products"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
