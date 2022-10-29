import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GrandPrix } from '../grand-prix/grand-prix.entity';

@Entity('sprint')
export class Sprint {
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
  sprint_points: number;
}
