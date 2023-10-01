import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumsInItemOrdersDeleted1696201752199 implements MigrationInterface {
    name = 'ColumsInItemOrdersDeleted1696201752199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_in_orders" DROP CONSTRAINT "FK_e4f7fc8c4bf684d714a4945694b"`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" DROP CONSTRAINT "FK_c5f3060578761c4c92b8087da2b"`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ALTER COLUMN "orderId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ADD CONSTRAINT "FK_e4f7fc8c4bf684d714a4945694b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ADD CONSTRAINT "FK_c5f3060578761c4c92b8087da2b" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_in_orders" DROP CONSTRAINT "FK_c5f3060578761c4c92b8087da2b"`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" DROP CONSTRAINT "FK_e4f7fc8c4bf684d714a4945694b"`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ALTER COLUMN "orderId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ADD CONSTRAINT "FK_c5f3060578761c4c92b8087da2b" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ADD CONSTRAINT "FK_e4f7fc8c4bf684d714a4945694b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
