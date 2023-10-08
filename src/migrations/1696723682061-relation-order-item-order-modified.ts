import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationOrderItemOrderModified1696723682061 implements MigrationInterface {
    name = 'RelationOrderItemOrderModified1696723682061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants_in_orders" DROP CONSTRAINT "FK_e4f7fc8c4bf684d714a4945694b"`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" RENAME COLUMN "productId" TO "variantId"`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" ADD CONSTRAINT "FK_ab78019fa6e512610a38542aeae" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants_in_orders" DROP CONSTRAINT "FK_ab78019fa6e512610a38542aeae"`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" RENAME COLUMN "variantId" TO "productId"`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" ADD CONSTRAINT "FK_e4f7fc8c4bf684d714a4945694b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
