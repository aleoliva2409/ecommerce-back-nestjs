import { MigrationInterface, QueryRunner } from "typeorm";

export class ColorAndSizeTableAdded1696721972943 implements MigrationInterface {
    name = 'ColorAndSizeTableAdded1696721972943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sizes_type_enum" AS ENUM('letter', 'number')`);
        await queryRunner.query(`CREATE TABLE "sizes" ("id" SERIAL NOT NULL, "name" character varying(10) NOT NULL, "type" "public"."sizes_type_enum" NOT NULL, CONSTRAINT "UQ_9fc6e663546e7a6cfdc465e86df" UNIQUE ("name"), CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colors" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "code" character varying(7) NOT NULL, CONSTRAINT "UQ_cf12321fa0b7b9539e89c7dfeb7" UNIQUE ("name"), CONSTRAINT "UQ_69fbcefcd7e013cc4abcbde2e43" UNIQUE ("code"), CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "sizeId" integer`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "colorId" integer`);
        await queryRunner.query(`CREATE TYPE "public"."products_size_type_enum" AS ENUM('letter', 'number')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "size_type" "public"."products_size_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_a87b8b3bf0a30377d53a7605c8a" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_a87b8b3bf0a30377d53a7605c8a"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "size_type"`);
        await queryRunner.query(`DROP TYPE "public"."products_size_type_enum"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "colorId"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "sizeId"`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "color" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "size" character varying(5) NOT NULL`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TABLE "sizes"`);
        await queryRunner.query(`DROP TYPE "public"."sizes_type_enum"`);
    }

}
