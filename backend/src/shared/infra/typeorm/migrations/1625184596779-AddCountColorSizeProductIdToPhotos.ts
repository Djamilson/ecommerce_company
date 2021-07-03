import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCountColorSizeProductIdToPhotos1625184596779
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'photos',
      new TableColumn({
        name: 'count_color_size_product_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'photos',
      new TableForeignKey({
        name: 'CountsColorsSizesProductsPhotos',
        columnNames: ['count_color_size_product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'counts_colors_sizes_products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'photos',
      'CountsColorsSizesProductsPhotos',
    );

    await queryRunner.dropColumn('photos', 'count_color_size_product_id');
  }
}
