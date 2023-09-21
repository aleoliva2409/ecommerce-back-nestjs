import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 5 }) // enum
  size: string;

  @Column('integer')
  stock: number;

  @Column('varchar', { length: 20, nullable: true }) // enum
  color?: string;

  @Column('text', { array: true })
  images: string[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
