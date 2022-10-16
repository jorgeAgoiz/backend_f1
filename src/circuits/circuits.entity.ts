import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Circuits {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 225 })
  gp_name: string;

  @Column({ length: 225, unique: true })
  circuit_name: string;

  @Column({ length: 225 })
  location: string;

  @Column({ length: 150 })
  country: string;

  @Column({ type: 'double', precision: 4, scale: 3 })
  distance: number;
}
