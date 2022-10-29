import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GrandPrix } from '../grand-prix/grand-prix.entity';

@Entity('qualifying')
export class Qualifying {
  @ManyToOne(() => GrandPrix)
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'id' })
  @PrimaryColumn()
  grand_prix: GrandPrix;

  @PrimaryColumn()
  qf_number: number;

  @Column()
  position: number;

  @Column()
  laps: number;

  @Column({ type: 'varchar', length: 15 })
  fast_lap: string;

  @Column({ type: 'varchar', length: 15 })
  average_speed: string;
}
