import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';
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

  @Column({
    type: 'varchar',
    length: 15,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        if (value !== 'no register') {
          return fastLapStringToMiliseconds(value);
        } else {
          return value;
        }
      },
    },
  })
  fast_lap: string;

  @Column({
    type: 'varchar',
    length: 15,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  average_speed: string;
}
