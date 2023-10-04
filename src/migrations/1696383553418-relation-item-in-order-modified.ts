import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationItemInOrderModified1696383553418 implements MigrationInterface {
    name = 'RelationItemInOrderModified1696383553418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_0004559970b4fbea4655f992ec5"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "itemInOrderId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "itemInOrderId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_0004559970b4fbea4655f992ec5" FOREIGN KEY ("itemInOrderId") REFERENCES "items_in_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
