import { MigrationInterface, QueryRunner } from "typeorm";

export class LittleMods1698886030136 implements MigrationInterface {
    name = 'LittleMods1698886030136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying(40) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'supervisor', 'client')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'client'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('admin', 'supervisor', 'client')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" "public"."users_roles_enum" NOT NULL DEFAULT 'client'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "fullName" character varying(40) NOT NULL`);
    }

}
