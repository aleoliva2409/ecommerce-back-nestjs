import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 30, nullable: true })
  brand?: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('varchar', { length: 15, array: true, default: [] })
  tags?: string[];

  @Column('text', { array: true, default: [] })
  images: string[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
