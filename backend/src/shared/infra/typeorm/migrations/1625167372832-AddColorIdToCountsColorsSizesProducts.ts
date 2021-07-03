import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddColorIdToCountsColorsSizesProducts1625167372832
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'counts_colors_sizes_products',
      new TableColumn({
        name: 'color_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'counts_colors_sizes_products',
      new TableForeignKey({
        name: 'ColorsCountsColorsSizesProducts',
        columnNames: ['color_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'colors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'counts_colors_sizes_products',
      'ColorsCountsColorsSizesProducts',
    );

    await queryRunner.dropColumn('counts_colors_sizes_products', 'color_id');
  }
}
