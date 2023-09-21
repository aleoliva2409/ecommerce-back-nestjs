import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('datetime', { name: 'paid_at', nullable: true })
  paidAt?: Date;

  @Column('float', { name: 'sub_total' })
  subTotal: number;

  @Column('float')
  total: number;

  @Column('integer', { name: 'total_items' })
  totalItems: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
