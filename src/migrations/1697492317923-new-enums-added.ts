import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEnumsAdded1697492317923 implements MigrationInterface {
    name = 'NewEnumsAdded1697492317923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."sizes_type_enum" RENAME TO "sizes_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."sizes_type_enum" AS ENUM('tipo 1', 'tipo 2', 'tipo 3', 'tipo 4')`);
        await queryRunner.query(`ALTER TABLE "sizes" ALTER COLUMN "type" TYPE "public"."sizes_type_enum" USING "type"::"text"::"public"."sizes_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."sizes_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pendingToPay', 'pendingToConfirm', 'paid', 'sent', 'readyToDelivered')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."products_size_type_enum" RENAME TO "products_size_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."products_size_type_enum" AS ENUM('tipo 1', 'tipo 2', 'tipo 3', 'tipo 4')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "size_type" TYPE "public"."products_size_type_enum" USING "size_type"::"text"::"public"."products_size_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."products_size_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_size_type_enum_old" AS ENUM('letter', 'number')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "size_type" TYPE "public"."products_size_type_enum_old" USING "size_type"::"text"::"public"."products_size_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."products_size_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."products_size_type_enum_old" RENAME TO "products_size_type_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" character varying NOT NULL DEFAULT 'preparacion'`);
        await queryRunner.query(`CREATE TYPE "public"."sizes_type_enum_old" AS ENUM('letter', 'number')`);
        await queryRunner.query(`ALTER TABLE "sizes" ALTER COLUMN "type" TYPE "public"."sizes_type_enum_old" USING "type"::"text"::"public"."sizes_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."sizes_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."sizes_type_enum_old" RENAME TO "sizes_type_enum"`);
    }

}
