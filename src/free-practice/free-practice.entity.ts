import { GrandPrix } from 'src/grand-prix/grand-prix.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('free_practice')
export class FreePractice {
  @ManyToOne(() => GrandPrix, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'grand_prix', referencedColumnName: 'id' })
  @PrimaryColumn()
  grand_prix: number;

  @Column()
  @PrimaryColumn()
  fp_number: number;

  @Column()
  position: number;

  @Column()
  laps: number;

  @Column()
  fast_lap: string;

  @Column()
  average_speed: string;
}
