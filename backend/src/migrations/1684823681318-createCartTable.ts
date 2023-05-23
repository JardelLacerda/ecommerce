import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartTable1684823681318 implements MigrationInterface {
    name = 'CreateCartTable1684823681318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(12,2) NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "carts"`);
    }

}
