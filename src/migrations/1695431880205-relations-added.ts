import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationsAdded1695431880205 implements MigrationInterface {
    name = 'RelationsAdded1695431880205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items_in_orders" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_67ea94e9f3dd97cef3905996f32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "itemInOrderId" integer`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_bdbfe33a28befefa9723c355036" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ADD CONSTRAINT "FK_e4f7fc8c4bf684d714a4945694b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" ADD CONSTRAINT "FK_c5f3060578761c4c92b8087da2b" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_0004559970b4fbea4655f992ec5" FOREIGN KEY ("itemInOrderId") REFERENCES "items_in_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a6b3c434392f5d10ec171043666" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a6b3c434392f5d10ec171043666"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_0004559970b4fbea4655f992ec5"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" DROP CONSTRAINT "FK_c5f3060578761c4c92b8087da2b"`);
        await queryRunner.query(`ALTER TABLE "items_in_orders" DROP CONSTRAINT "FK_e4f7fc8c4bf684d714a4945694b"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_bdbfe33a28befefa9723c355036"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "itemInOrderId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "productId"`);
        await queryRunner.query(`DROP TABLE "items_in_orders"`);
    }

}
