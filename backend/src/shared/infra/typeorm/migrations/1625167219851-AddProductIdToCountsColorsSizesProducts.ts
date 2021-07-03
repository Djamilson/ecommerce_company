import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProductIdToCountsColorsSizesProducts1625167219851
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'counts_colors_sizes_products',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'counts_colors_sizes_products',
      new TableForeignKey({
        name: 'ProductsCountsColorsSizesProducts',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'counts_colors_sizes_products',
      'ProductsCountsColorsSizesProducts',
    );

    await queryRunner.dropColumn('counts_colors_sizes_products', 'product_id');
  }
}
