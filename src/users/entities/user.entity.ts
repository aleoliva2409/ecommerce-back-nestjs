import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Roles } from '../types/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 40 })
  fullName: string;

  @Column('varchar', { length: 40, unique: true })
  email: string;

  @Column('varchar', { length: 30 })
  password: string;

  @Column('boolean', { default: true, name: 'is_active' })
  isActive: boolean;

  @Column('enum', { enum: Roles, default: Roles.client })
  roles: Roles;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
