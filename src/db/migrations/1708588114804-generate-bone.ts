import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateBone1708588114804 implements MigrationInterface {
    name = 'GenerateBone1708588114804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "bone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bone"`);
    }

}
