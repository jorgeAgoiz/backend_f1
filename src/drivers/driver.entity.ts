import { GrandPrix } from 'src/grand-prix/grand-prix.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('drivers')
export class Driver {
  @OneToMany(() => GrandPrix, (grandPrix) => grandPrix.driver)
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'driver' })
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
