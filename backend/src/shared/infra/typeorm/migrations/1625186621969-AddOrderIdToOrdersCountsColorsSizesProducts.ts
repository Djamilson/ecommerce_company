import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddOrderIdToOrdersCountsColorsSizesProducts1625186621969
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_counts_colors_sizes_products',
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'orders_counts_colors_sizes_products',
      new TableForeignKey({
        name: 'OrdersProductsOrder',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'orders_counts_colors_sizes_products',
      'OrdersProductsOrder',
    );

    await queryRunner.dropColumn(
      'orders_counts_colors_sizes_products',
      'order_id',
    );
  }
}
