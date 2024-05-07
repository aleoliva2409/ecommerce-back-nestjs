import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 25 })
  name: string;

  @Column('varchar', { length: 25 })
  lastName: string;

  @Column('varchar', { length: 20 })
  phone: string;

  @Column('varchar', { length: 30 })
  address1: string;

  @Column('varchar', { length: 30, nullable: true })
  address2: string;

  @Column('varchar', { length: 10, nullable: true })
  floor: string;

  @Column('varchar', { length: 25 })
  city: string;

  @Column('varchar', { length: 15 })
  zipCode: string;

  // @Column('')
  // country: Country;

  // @Column('')
  // user: User;
}
