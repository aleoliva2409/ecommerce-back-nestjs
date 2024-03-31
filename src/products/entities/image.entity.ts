import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Variant } from './variant.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 150, unique: true })
  url: string;

  @ManyToOne(() => Variant, (variant) => variant.images)
  variant: Variant;
}
