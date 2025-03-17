import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1741869340861 implements MigrationInterface {
    name = 'Mig1741869340861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boards" ("id" character varying(50) NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255), "status" character varying(50) NOT NULL, "created_at" bigint NOT NULL, "updated_at" bigint NOT NULL, CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "boards"`);
    }

}
