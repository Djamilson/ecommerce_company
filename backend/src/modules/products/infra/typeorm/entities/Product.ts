import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import Price from '@modules/prices/infra/typeorm/entities/Price';
import Section from '@modules/sections/infra/typeorm/entities/Section';

import { CountColorSizeProduct } from './CountColorSizeProduct';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Price)
  @JoinColumn({ name: 'price_id' })
  price: Price;

  @Column()
  price_id: string;

  @OneToMany(
    () => CountColorSizeProduct,
    size_product_products => size_product_products.product,
  )
  count_color_size_products: CountColorSizeProduct[];

  @ManyToOne(() => Brand, brand => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column()
  brand_id: string;

  @ManyToOne(() => Section, section => section.products)
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @Column()
  section_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
