import { Circuit } from 'src/models/circuits/circuit.entity';
import { Driver } from 'src/models/drivers/driver.entity';
import { Team } from 'src/models/teams/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('grand_prix')
export class GrandPrix {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Circuit, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'circuit', referencedColumnName: 'id' })
  circuit: number;

  @ManyToOne(() => Driver, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'driver', referencedColumnName: 'id' })
  driver: number;

  @ManyToOne(() => Team, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'team', referencedColumnName: 'id' })
  team: number;

  @Column({ length: 4 })
  year: string;

  @Column()
  sprint: boolean;
}
