import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from './order.entity';
import { Variant } from '../../products/entities';

@Entity('items_in_orders')
export class ItemInOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  quantity: number;

  @ManyToOne(() => Variant, (variant) => variant.itemInOrder)
  variant: Variant;

  @ManyToOne(() => Order, (order) => order.itemInOrder)
  order: Order;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
