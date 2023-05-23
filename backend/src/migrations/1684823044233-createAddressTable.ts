import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1684823044233 implements MigrationInterface {
    name = 'CreateAddressTable1684823044233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(150) NOT NULL, "zipCode" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "number" character varying(8), "city" character varying(150) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
