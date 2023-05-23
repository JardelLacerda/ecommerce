import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1684822661937 implements MigrationInterface {
    name = 'CreateUserTable1684822661937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_permission_enum" AS ENUM('user', 'admin', 'merchant')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(120) NOT NULL, "permission" "public"."users_permission_enum" NOT NULL DEFAULT 'user', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_permission_enum"`);
    }

}
