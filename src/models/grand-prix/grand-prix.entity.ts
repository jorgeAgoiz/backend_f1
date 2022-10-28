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

  @ManyToOne(() => Circuit, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'circuit', referencedColumnName: 'id' })
  circuit: Circuit;

  @ManyToOne(() => Driver, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'driver', referencedColumnName: 'id' })
  driver: Driver;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team', referencedColumnName: 'id' })
  team: Team;

  @Column({ length: 4 })
  year: string;

  @Column()
  sprint: boolean;
}
