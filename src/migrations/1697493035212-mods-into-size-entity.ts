import { MigrationInterface, QueryRunner } from "typeorm";

export class ModsIntoSizeEntity1697493035212 implements MigrationInterface {
    name = 'ModsIntoSizeEntity1697493035212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sizes" ADD "order" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP CONSTRAINT "UQ_9fc6e663546e7a6cfdc465e86df"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sizes" ADD CONSTRAINT "UQ_9fc6e663546e7a6cfdc465e86df" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "sizes" DROP COLUMN "order"`);
    }

}
