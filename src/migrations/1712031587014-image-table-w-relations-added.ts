import { MigrationInterface, QueryRunner } from "typeorm";

export class ImageTableWRelationsAdded1712031587014 implements MigrationInterface {
    name = 'ImageTableWRelationsAdded1712031587014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" character varying(150) NOT NULL, "cloudinaryId" character varying(20) NOT NULL, "variantId" integer, CONSTRAINT "UQ_a4d7e908a3574e21ca5f06d0aad" UNIQUE ("url"), CONSTRAINT "UQ_e01c04e0771e519e2a8695e2d29" UNIQUE ("cloudinaryId"), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "variants" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "imageUrl" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_551904d52ee021c37f510b1b689" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_551904d52ee021c37f510b1b689"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "variants" ADD "images" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
