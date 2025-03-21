import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1742462500962 implements MigrationInterface {
    name = 'Mig1742462500962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" ADD "visibility" character varying(25) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "visibility"`);
    }

}
