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

  @Column({ type: 'varchar', length: 15 })
  average_speed: string;

  @Column()
  num_pit_stops: number;

  @Column({ type: 'varchar', length: 18 })
  total_time: string;

  @Column({ type: 'varchar', length: 120 })
  retired: string;

  @Column()
  race_points: number;
}
