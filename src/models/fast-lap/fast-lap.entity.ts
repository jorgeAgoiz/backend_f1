import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GrandPrix } from '../grand-prix/grand-prix.entity';

@Entity('fast_lap')
export class FastLap {
  @ManyToOne(() => GrandPrix)
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'id' })
  @PrimaryColumn()
  grand_prix: GrandPrix;

  @PrimaryColumn({ type: 'varchar', length: 8 })
  fl_session: number;

  @Column({ type: 'varchar', length: 15 })
  time: string;

  @Column()
  lap: string;
}
