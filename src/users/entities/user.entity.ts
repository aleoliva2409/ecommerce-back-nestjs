import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Roles } from '../types/roles.enum';
import { Order } from '../../orders/entities/order.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 40 })
  fullName: string;

  @Column('varchar', { length: 40, unique: true })
  email: string;

  @Column('varchar', { length: 150 })
  password: string;

  @Column('boolean', { default: true, name: 'is_active' })
  isActive: boolean;

  @Column('enum', { enum: Roles, default: Roles.client })
  roles: Roles;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (reviews) => reviews.user)
  reviews: Review[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
