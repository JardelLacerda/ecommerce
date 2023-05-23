import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationsUsers1684824435263 implements MigrationInterface {
    name = 'CreateRelationsUsers1684824435263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "addressesId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "UQ_69828a178f152f157dcf2f70a89" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "stores" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "UQ_f36d697e265ed99b80cae6984c9" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ee9fa00c4b7e9d9357a22b12275" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_f36d697e265ed99b80cae6984c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_f36d697e265ed99b80cae6984c9"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ee9fa00c4b7e9d9357a22b12275"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "UQ_f36d697e265ed99b80cae6984c9"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressesId"`);
    }

}
