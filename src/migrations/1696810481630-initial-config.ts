import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialConfig1696810481630 implements MigrationInterface {
    name = 'InitialConfig1696810481630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "content" character varying(255) NOT NULL, "score" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "productId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_size_type_enum" AS ENUM('letter', 'number')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "brand" character varying(30), "price" numeric(10,2) NOT NULL, "tags" character varying(15) array NOT NULL DEFAULT '{}', "size_type" "public"."products_size_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "categoryId" integer, CONSTRAINT "UQ_c30f00a871de74c8e8c213acc4a" UNIQUE ("title"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sizes_type_enum" AS ENUM('letter', 'number')`);
        await queryRunner.query(`CREATE TABLE "sizes" ("id" SERIAL NOT NULL, "name" character varying(5) NOT NULL, "type" "public"."sizes_type_enum" NOT NULL, CONSTRAINT "UQ_9fc6e663546e7a6cfdc465e86df" UNIQUE ("name"), CONSTRAINT "PK_09ffc681886e25eb5ce3b319fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variants" ("id" SERIAL NOT NULL, "stock" integer NOT NULL, "images" text array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "sizeId" integer, "colorId" integer, "productId" integer, CONSTRAINT "PK_672d13d1a6de0197f20c6babb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colors" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "code" character varying(7) NOT NULL, CONSTRAINT "UQ_cf12321fa0b7b9539e89c7dfeb7" UNIQUE ("name"), CONSTRAINT "UQ_69fbcefcd7e013cc4abcbde2e43" UNIQUE ("code"), CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('admin', 'supervisor', 'client')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullName" character varying(40) NOT NULL, "email" character varying(40) NOT NULL, "password" character varying(150) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "roles" "public"."users_roles_enum" NOT NULL DEFAULT 'client', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "is_paid" boolean NOT NULL DEFAULT false, "status" character varying NOT NULL DEFAULT 'preparacion', "tax" numeric, "paid_at" date, "sub_total" numeric NOT NULL, "total" numeric NOT NULL, "total_items" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variants_in_orders" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "variantId" integer, "orderId" integer, CONSTRAINT "PK_79f774723d003824bf47a6fe327" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a6b3c434392f5d10ec171043666" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_a87b8b3bf0a30377d53a7605c8a" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_bdbfe33a28befefa9723c355036" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" ADD CONSTRAINT "FK_9c1097d3f905788db5da9d9fd2d" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" ADD CONSTRAINT "FK_fda8c95faf5c5d9792248f81732" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants_in_orders" DROP CONSTRAINT "FK_fda8c95faf5c5d9792248f81732"`);
        await queryRunner.query(`ALTER TABLE "variants_in_orders" DROP CONSTRAINT "FK_9c1097d3f905788db5da9d9fd2d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_bdbfe33a28befefa9723c355036"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_a37db4beeabddc64fc7142c0a67"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_a87b8b3bf0a30377d53a7605c8a"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a6b3c434392f5d10ec171043666"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`DROP TABLE "variants_in_orders"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TABLE "variants"`);
        await queryRunner.query(`DROP TABLE "sizes"`);
        await queryRunner.query(`DROP TYPE "public"."sizes_type_enum"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_size_type_enum"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
