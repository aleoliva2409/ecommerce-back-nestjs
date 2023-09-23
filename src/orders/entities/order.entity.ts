import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
