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
import { Status } from '../types/status.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('boolean', { default: false, name: 'is_paid' })
  isPaid: boolean;

  @Column('enum', { enum: Status })
  status: Status;

  @Column('decimal', {
    nullable: true,
    precision: 5,
    scale: 4,
    transformer: {
      from: (price: number) => Number(price),
      to: (price: number) => Number(price),
    },
  })
  tax?: number;

  @Column('date', { name: 'paid_at', nullable: true })
  paidAt?: Date;

  @Column('decimal', {
    name: 'sub_total',
    precision: 10,
    scale: 2,
    transformer: {
      from: (price: number) => Number(price),
      to: (price: number) => Number(price),
    },
  })
  subTotal: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      from: (price: number) => Number(price),
      to: (price: number) => Number(price),
    },
  })
  total: number;

  @Column('integer', { name: 'total_items' })
  totalItems: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
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
