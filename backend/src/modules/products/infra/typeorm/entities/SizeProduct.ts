import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CountColorSizeProduct } from './CountColorSizeProduct';

@Entity('sizes_products')
class SizeProduct {
  @PrimaryColumn()
  id: string;

  @Column()
  size: string;

  @OneToMany(
    () => CountColorSizeProduct,
    size_product_products => size_product_products.product,
  )
  count_color_size_products: CountColorSizeProduct[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { SizeProduct };
