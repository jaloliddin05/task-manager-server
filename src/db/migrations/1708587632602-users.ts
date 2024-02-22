import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1708587632602 implements MigrationInterface {
    name = 'Users1708587632602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "bone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bone"`);
    }

}
