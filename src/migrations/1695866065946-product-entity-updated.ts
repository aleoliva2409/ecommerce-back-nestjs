import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductEntityUpdated1695866065946 implements MigrationInterface {
    name = 'ProductEntityUpdated1695866065946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_c30f00a871de74c8e8c213acc4a" UNIQUE ("title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_c30f00a871de74c8e8c213acc4a"`);
    }

}
