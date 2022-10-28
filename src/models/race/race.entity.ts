import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GrandPrix } from '../grand-prix/grand-prix.entity';

@Entity('race')
export class Race {
  @ManyToOne(() => GrandPrix)
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'id' })
  @PrimaryColumn()
  grand_prix: GrandPrix;

  @Column()
  position: number;

  @Column()
  laps_disputed: number;

  @Column()
  average_speed: string;

  @Column()
  num_pit_stops: number;

  @Column()
  total_time: string;

  @Column()
  retired: string;

  @Column()
  race_points: string;
}
