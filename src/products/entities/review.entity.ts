import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './product.entity';
import { User } from '../../users/entities/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 255 })
  content: string;

  @Column('decimal', {
    precision: 2,
    scale: 1,
    transformer: {
      from: (price: number) => Number(price),
      to: (price: number) => Number(price),
    },
  })
  score: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
