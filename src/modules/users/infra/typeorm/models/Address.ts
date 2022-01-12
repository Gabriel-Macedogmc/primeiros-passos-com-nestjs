import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'street', type: 'varchar' })
  street: string;

  @Column({ name: 'city', type: 'varchar' })
  city: string;

  @Column({ name: 'state', type: 'varchar' })
  state: string;
}
