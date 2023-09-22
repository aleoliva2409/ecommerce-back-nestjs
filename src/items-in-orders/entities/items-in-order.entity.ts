import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items_in_order')
export class ItemsInOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
