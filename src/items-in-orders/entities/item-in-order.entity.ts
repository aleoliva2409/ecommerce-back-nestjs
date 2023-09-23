import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('items_in_orders')
export class ItemInOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  quantity: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.itemInOrder)
  product: Product;

  @ManyToOne(() => Order, (order) => order.itemInOrder)
  order: Order;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
