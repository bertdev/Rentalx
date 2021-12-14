import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCarsAvailable1639509807596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "cars",
      "availible",
      new TableColumn({ name: "available", type: "boolean", default: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("cars", "available");
  }
}
