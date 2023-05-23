import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyCartTable1684823733269 implements MigrationInterface {
    name = 'ModifyCartTable1684823733269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" RENAME COLUMN "price" TO "totalPrice"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" RENAME COLUMN "totalPrice" TO "price"`);
    }

}
