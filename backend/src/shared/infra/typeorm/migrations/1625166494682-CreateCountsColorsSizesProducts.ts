import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCountsColorsSizesProducts1625166494682
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'counts_colors_sizes_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'status',
            type: 'boolean',
            default: true,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sku',
            type: 'varchar',

            isNullable: true,
          },
          {
            name: 'bar_code',
            type: 'varchar',

            isNullable: true,
          },

          {
            name: 'stock',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('counts_colors_sizes_products');
  }
}
