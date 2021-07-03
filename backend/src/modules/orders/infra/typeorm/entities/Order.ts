import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import { OrderCountColorSizeProduct } from './OrderCountColorSizeProduct';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @OneToMany(
    () => OrderCountColorSizeProduct,
    order_products => order_products.order,
    {
      cascade: true,
    },
  )
  order_products: OrderCountColorSizeProduct[];

  @Column('decimal')
  total: number;

  @Column('decimal')
  fee: number;

  @CreateDateColumn()
  canceled_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
