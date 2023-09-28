import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageColumnDeletedIntoProductTable1695871871142 implements MigrationInterface {
    name = 'ImageColumnDeletedIntoProductTable1695871871142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "images" text array NOT NULL DEFAULT '{}'`);
    }

}
