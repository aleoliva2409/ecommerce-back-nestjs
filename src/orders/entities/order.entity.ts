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
import { VariantInOrder } from './variant-in-order.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('boolean', { default: false, name: 'is_paid' })
  isPaid: boolean;

  @Column('varchar', { default: 'preparacion' }) // es enum
  status: string;

  @Column('decimal', { nullable: true, precision: 5, scale: 4 })
  tax?: number;

  @Column('date', { name: 'paid_at', nullable: true })
  paidAt?: Date;

  @Column('decimal', { name: 'sub_total', precision: 10, scale: 2 })
  subTotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column('integer', { name: 'total_items' })
  totalItems: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => VariantInOrder, (variantInOrder) => variantInOrder.order)
  variantInOrder: VariantInOrder[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
