import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
