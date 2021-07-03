import { Column, Entity, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CountColorSizeProduct } from './CountColorSizeProduct';

@Entity('photos')
class Photo {
  @PrimaryColumn()
  id: string;

  @Column()
  count_color_size_product_id: string;

  @Column()
  photo: string;

  @OneToOne(
    () => CountColorSizeProduct,
    countColorSizeProduct => countColorSizeProduct.photos,
  )
  @JoinColumn({ name: 'count_color_size_product_id' })
  countColorSizeProduct: CountColorSizeProduct;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Photo };
