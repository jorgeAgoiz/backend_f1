import { GrandPrix } from 'src/grand-prix/grand-prix.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('teams')
export class Team {
  @OneToMany(() => GrandPrix, (grandPrix) => grandPrix.team)
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'team' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 225, unique: true })
  name: string;

  @Column({ length: 150 })
  country: string;

  @Column({ length: 450 })
  url_logo: string;
}
