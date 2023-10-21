import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultValueAddedInVariantsTable1697924541053 implements MigrationInterface {
    name = 'DefaultValueAddedInVariantsTable1697924541053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants" ALTER COLUMN "images" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variants" ALTER COLUMN "images" DROP DEFAULT`);
    }

}
