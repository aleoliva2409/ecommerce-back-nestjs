import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SizeType } from '../types/size-type.enum';
import { Variant } from './variant.entity';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 5, unique: true })
  name: string;

  @Column('enum', { enum: SizeType })
  type: SizeType;

  @OneToMany(() => Variant, (variant) => variant.size)
  variants: Variant[];
}
