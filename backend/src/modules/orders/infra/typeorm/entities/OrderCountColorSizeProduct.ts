import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import { CountColorSizeProduct } from '@modules/products/infra/typeorm/entities/CountColorSizeProduct';

@Entity('orders_count_colors_sizes_products')
class OrderCountColorSizeProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(
    () => CountColorSizeProduct,
    countColorSizeProduct =>
      countColorSizeProduct.order_count_color_size_products,
  )
  @JoinColumn({ name: 'count_color_size_product_id' })
  count_color_size_product: CountColorSizeProduct;

  @Column()
  count_color_size_product_id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column()
  order_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { OrderCountColorSizeProduct };
