import { GrandPrix } from 'src/models/grand-prix/grand-prix.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('free_practice')
export class FreePractice {
  @ManyToOne(() => GrandPrix)
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'id' })
  @PrimaryColumn()
  grand_prix: GrandPrix;

  @PrimaryColumn()
  fp_number: number;

  @Column()
  position: number;

  @Column()
  laps: number;

  @Column({ length: 15 })
  fast_lap: string;

  @Column({ length: 15 })
  average_speed: string;
}
