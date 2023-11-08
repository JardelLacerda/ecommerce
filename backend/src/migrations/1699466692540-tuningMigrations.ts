import { MigrationInterface, QueryRunner } from "typeorm";

export class TuningMigrations1699466692540 implements MigrationInterface {
    name = 'TuningMigrations1699466692540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ee9fa00c4b7e9d9357a22b12275"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressesId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressesId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ee9fa00c4b7e9d9357a22b12275" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
