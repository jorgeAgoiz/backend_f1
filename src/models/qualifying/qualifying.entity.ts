import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GrandPrix } from '../grand-prix/grand-prix.entity';

@Entity('qualifying')
export class Qualifying {
  @ManyToOne(() => GrandPrix, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'id' })
  @PrimaryColumn()
  grand_prix: number;

  @PrimaryColumn()
  qf_number: number;

  @Column()
  position: number;

  @Column()
  laps: number;

  @Column()
  fast_lap: string;

  @Column()
  average_speed: string;
}
