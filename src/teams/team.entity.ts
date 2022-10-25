import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 225, unique: true })
  name: string;

  @Column({ length: 150 })
  country: string;

  @Column({ length: 450 })
  url_logo: string;
}
