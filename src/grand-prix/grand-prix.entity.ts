import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grand_prix')
export class GrandPrix {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  circuit: number;

  @Column()
  driver: number;

  @Column()
  team: number;

  @Column({ length: 4 })
  year: string;

  @Column()
  sprint: boolean;
}
