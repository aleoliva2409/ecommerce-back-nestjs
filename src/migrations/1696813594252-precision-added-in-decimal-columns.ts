import { MigrationInterface, QueryRunner } from "typeorm";

export class PrecisionAddedInDecimalColumns1696813594252 implements MigrationInterface {
    name = 'PrecisionAddedInDecimalColumns1696813594252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "tax" TYPE numeric(5,4)`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "sub_total" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "total" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "score" TYPE numeric(2,1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ALTER COLUMN "score" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "total" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "sub_total" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "tax" TYPE numeric`);
    }

}
