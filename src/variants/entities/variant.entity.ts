import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 5 }) // enum
  size: string;

  @Column('integer')
  stock: number;

  @Column('varchar', { length: 20, nullable: true }) // enum
  color?: string;

  @Column('text', { array: true })
  images: string[];

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
