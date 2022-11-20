import { GrandPrix } from '../grand-prix/grand-prix.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('circuits')
export class Circuit {
  @OneToMany(() => GrandPrix, (grandPrix) => grandPrix.circuit)
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'circuit' })
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
