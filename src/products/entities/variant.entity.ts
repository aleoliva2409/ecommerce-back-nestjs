import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from './product.entity';
import { Size } from './size.entity';
import { Color } from './color.entity';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  stock: number;

  @Column('text', { array: true })
  images?: string[] = [];

  @ManyToOne(() => Size, (size) => size.variants)
  size: Size;

  @ManyToOne(() => Color, (color) => color.variants, { nullable: true })
  color?: Color;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
