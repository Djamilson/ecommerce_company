import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCountColorSizeProductIdToOrdersCountsColorsSizesProducts1625186471595
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_counts_colors_sizes_products',
      new TableColumn({
        name: 'count_color_size_product_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'orders_counts_colors_sizes_products',
      new TableForeignKey({
        name: 'OrdersCountsColorsSizesProducts',
        columnNames: ['count_color_size_product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'counts_colors_sizes_products',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'orders_counts_colors_sizes_products',
      'OrdersCountsColorsSizesProducts',
    );

    await queryRunner.dropColumn(
      'orders_counts_colors_sizes_products',
      'product_id',
    );
  }
}
