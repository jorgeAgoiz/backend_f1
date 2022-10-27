import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { FreePractice } from 'src/models/free-practice/free-practice.entity';
import { GrandPrix } from 'src/models/grand-prix/grand-prix.entity';
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

      entities: [Circuit, Driver, Team, GrandPrix, FreePractice],
      synchronize: false,
    };
  }
}
