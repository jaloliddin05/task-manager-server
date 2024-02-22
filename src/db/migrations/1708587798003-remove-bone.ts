import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveBone1708587798003 implements MigrationInterface {
    name = 'RemoveBone1708587798003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "bone" character varying`);
    }

}
