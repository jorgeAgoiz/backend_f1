import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { FastLap } from '../models/fast-lap/fast-lap.entity';
import { FreePractice } from '../models/free-practice/free-practice.entity';
import { GrandPrix } from '../models/grand-prix/grand-prix.entity';
import { Grid } from '../models/grid/grid.entity';
import { Qualifying } from '../models/qualifying/qualifying.entity';
import { Race } from '../models/race/race.entity';
import { Sprint } from '../models/sprint/sprint.entity';
import { Circuit } from '../models/circuits/circuit.entity';
import { Driver } from '../models/drivers/driver.entity';
import { Team } from '../models/teams/team.entity';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      entities: [
        Circuit,
        Driver,
        Team,
        GrandPrix,
        FreePractice,
        Qualifying,
        FastLap,
        Grid,
        Race,
        Sprint,
      ],
      synchronize: false,
    };
  }
}
