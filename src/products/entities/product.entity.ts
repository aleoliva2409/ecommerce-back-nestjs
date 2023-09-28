import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';
import { ItemInOrder } from '../../items-in-orders/entities/item-in-order.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Variant } from '../../variants/entities/variant.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100, unique: true })
  title: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 30, nullable: true })
  brand?: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('varchar', { length: 15, array: true, default: [] })
  tags?: string[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];

  @OneToMany(() => Review, (reviews) => reviews.product)
  reviews: Review[];

  @OneToMany(() => ItemInOrder, (itemInOrder) => itemInOrder.product)
  itemInOrder: ItemInOrder[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
