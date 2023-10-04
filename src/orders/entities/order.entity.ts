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

import { User } from '../../users/entities/user.entity';
import { ItemInOrder } from '../../items-in-orders/entities/item-in-order.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('boolean', { default: false, name: 'is_paid' })
  isPaid: boolean;

  @Column('varchar', { default: 'preparacion' }) // es enum
  status: string;

  @Column('float', { nullable: true })
  tax?: number;

  @Column('date', { name: 'paid_at', nullable: true })
  paidAt?: Date;

  @Column('float', { name: 'sub_total' })
  subTotal: number;

  @Column('float')
  total: number;

  @Column('integer', { name: 'total_items' })
  totalItems: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => ItemInOrder, (itemInOrder) => itemInOrder.order)
  itemInOrder: ItemInOrder[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
