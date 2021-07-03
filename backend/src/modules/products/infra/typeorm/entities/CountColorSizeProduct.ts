import { Exclude, Expose } from 'class-transformer';
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

import { OrderCountColorSizeProduct } from '@modules/orders/infra/typeorm/entities/OrderCountColorSizeProduct';
import User from '@modules/users/infra/typeorm/entities/User';

import uploadConfig from '@config/upload';

import { Color } from './Color';
import { Photo } from './Photo';
import Product from './Product';
import { SizeProduct } from './SizeProduct';

@Entity('counts_colors_sizes_products')
class CountColorSizeProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, product => product.count_color_size_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @OneToMany(() => Photo, photo => photo.countColorSizeProduct)
  @JoinColumn({ name: 'id' })
  photos: Photo[];

  @Column()
  bar_code: string;

  @Column()
  sku: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  stock: number;

  @ManyToOne(() => Color, color => color.count_color_size_products)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @Column()
  color_id: string;

  @ManyToOne(
    () => SizeProduct,
    sizeProduct => sizeProduct.count_color_size_products,
  )
  @Column()
  size_product_id: string;

  @OneToMany(
    () => OrderCountColorSizeProduct,
    order_products => order_products.count_color_size_product,
  )
  order_count_color_size_products: OrderCountColorSizeProduct[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @Column()
  thumbnail: string;

  @Expose({ name: 'thumbnail_url' })
  getAvatarUrl(): string | null {
    if (!this.thumbnail) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.thumbnail}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.thumbnail}`;
      default:
        return null;
    }
  }
}

export { CountColorSizeProduct };
