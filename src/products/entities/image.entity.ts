import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Variant } from './variant.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 150, unique: true, nullable: false })
  url: string;

  @Column('varchar', { length: 20, unique: true, nullable: false })
  cloudinaryId: string;

  @ManyToOne(() => Variant, (variant) => variant.images)
  variant: Variant;
}
