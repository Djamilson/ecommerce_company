import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSizeProductIdToCountsColorsSizesProducts1625167522447
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'counts_colors_sizes_products',
      new TableColumn({
        name: 'size_product_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'counts_colors_sizes_products',
      new TableForeignKey({
        name: 'SizesProductsCountsColorsSizesProducts',
        columnNames: ['size_product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sizes_products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'counts_colors_sizes_products',
      'SizesProductsCountsColorsSizesProducts',
    );

    await queryRunner.dropColumn('counts_colors_sizes_products', 'size_product_id');
  }
}
