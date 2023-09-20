import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 10 })
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  brand: string;

  @Column('numeric')
  price: number;

  @Column('varchar', { length: 10, array: true })
  tags: string[];

  @Column('text', { array: true })
  images: string[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
