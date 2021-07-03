import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('prices')
class Price {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Price;
