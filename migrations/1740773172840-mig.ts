import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1740773172840 implements MigrationInterface {
    name = 'Mig1740773172840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" bigint NOT NULL`);
    }

}
