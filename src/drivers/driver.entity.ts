import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 225, unique: true })
  name: string;

  @Column({ type: 'int' })
  dorsal_number: number;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ length: 150 })
  country: string;

  @Column({ length: 450 })
  picture: string;
}
